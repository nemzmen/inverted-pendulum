import math

from . import default


class FuzzyController:
    size = default.linguistic_size
    last_error_signal = default.last_error_signal
    error_part = default.error_part
    error_derivative_part = default.error_derivative_part
    output_part = default.output_part
    error_linguistic_area = default.error_linguistic_area
    error_derivative_linguistic_area = default.error_derivative_linguistic_area
    output_linguistic_area = default.output_linguistic_area
    output_linguistic_matrix = default.output_linguistic_matrix


    def __init__(
            self,
            sampling_time=None,
            fuzzy_error_min=None,
            fuzzy_derivative_min=None,
            fuzzy_control_min=None,
            fuzzy_error_max=None,
            fuzzy_derivative_max=None,
            fuzzy_control_max=None):

        self.sampling_time = default.sampling_time if sampling_time == None else sampling_time
        self.fuzzy_error_min = default.fuzzy_error_min if fuzzy_error_min == None else fuzzy_error_min
        self.fuzzy_derivative_min = default.fuzzy_derivative_min if fuzzy_derivative_min == None else fuzzy_derivative_min
        self.fuzzy_control_min = default.fuzzy_control_min if fuzzy_control_min == None else fuzzy_control_min
        self.fuzzy_error_max = default.fuzzy_error_max if fuzzy_error_max == None else fuzzy_error_max
        self.fuzzy_derivative_max = default.fuzzy_derivative_max if fuzzy_derivative_max == None else fuzzy_derivative_max
        self.fuzzy_control_max = default.fuzzy_control_max if fuzzy_control_max == None else fuzzy_control_max

        self.error_part = abs(self.fuzzy_error_max - self.fuzzy_error_min) / (self.size - 1)
        self.error_derivative_part = abs(self.fuzzy_derivative_max - self.fuzzy_derivative_min) / (self.size - 1)
        self.output_part = abs(self.fuzzy_control_max - self.fuzzy_control_min) / (self.size - 1)
        
        self.error_linguistic_area = [self.fuzzy_error_min + i * self.error_part for i in range(0, self.size)]
        self.error_derivative_linguistic_area = [self.fuzzy_derivative_min + i * self.error_derivative_part for i in range(0, self.size)]
        self.output_linguistic_area = [self.fuzzy_control_min + i * self.output_part for i in range(0, self.size)]
        
        out = self.output_linguistic_area
        self.output_linguistic_matrix =[[out[0],out[0],out[0],out[1],out[1],out[2],out[3]],
                                        [out[0],out[0],out[1],out[1],out[2],out[3],out[4]],
                                        [out[0],out[1],out[1],out[2],out[3],out[4],out[5]],
                                        [out[1],out[1],out[2],out[3],out[4],out[5],out[5]],
                                        [out[1],out[2],out[3],out[4],out[5],out[5],out[6]],
                                        [out[2],out[3],out[4],out[5],out[5],out[6],out[6]],
                                        [out[3],out[4],out[5],out[5],out[6],out[6],out[6]]]
                                    

    def fuzzyfication(self, min_val, max_val, signal, signal_part, linguistic_area):
        if signal >= max_val:
            return (self.size - 1) * [0] + [1]
        if signal <= min_val:
            return [1] + (self.size - 1) * [0]
        return [max(1 - (abs(i - signal) / (1.0 * signal_part)), 0) for i in linguistic_area]


    def get_rules_matrix(self, column, row):
        rules_matrix = [[0 for i in range(self.size)] for j in range(self.size)]
        for i in range(self.size):
            for j in range(self.size):
                rules_matrix[i][j] = row[i] * column[j]
        return rules_matrix
        
        
    def defuzzification_middle_of_maximum(self, matrix):
        maximum = 0
        index = [0, 0]
        for i in range(self.size):
            for j in range(self.size):
                if matrix[i][j] > maximum:
                    maximum = matrix[i][j]
                    index = [i, j]
        return self.output_linguistic_matrix[index[0]][index[1]]
        
        
    def defuzzification_average_value(self, matrix1, matrix2):
        sum = 0.0
        for i in range(self.size):
            for j in range(self.size):
                sum += matrix1[i][j] * matrix2[i][j]
        return sum / (self.size ** 2)


    def get_output(self, error_signal):
        error_derivative = (error_signal - self.last_error_signal) / self.sampling_time

        error_fuzzyfication_area = self.fuzzyfication(
                self.fuzzy_error_min,
                self.fuzzy_error_max,
                error_signal,
                self.error_part,
                self.error_linguistic_area)

        error_derivative_fuzzyfication_area = self.fuzzyfication(
                self.fuzzy_derivative_min,
                self.fuzzy_derivative_max,
                error_derivative,
                self.error_derivative_part,
                self.error_derivative_linguistic_area)
        
        rules_matrix = self.get_rules_matrix(error_fuzzyfication_area, error_derivative_fuzzyfication_area)
        
        output_signal = self.defuzzification_middle_of_maximum(rules_matrix)
        

        return output_signal
