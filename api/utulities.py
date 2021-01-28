import numpy


noise_types = {
    'normal': 'NORMAL',
    'pareto': 'PARETO',
    'sum': 'SUM',
}


class Signal:
    def __init__(self):
        self.size = 100
        self.mean = 0.0
        self.variance = 1.0
        self.noise_type = noise_types['normal']

    def get_noise(self, mean=None, size=None, variance=None, noise_type=None):
        size = self.size if size == None else size
        mean = self.mean if mean == None else mean
        variance = self.variance if variance == None else variance
        noise_type = self.noise_type if noise_type == None else noise_type

        data_array = []

        if noise_type == noise_types['normal']:
            data_array = numpy.random.normal(loc=mean, scale=variance, size=size)

        if noise_type == noise_types['pareto']:
            data_array = (numpy.random.pareto(a=2.5, size=size) * variance) + mean
        
        if noise_type == noise_types['sum']:
            normal_signal = numpy.random.normal(loc=mean, scale=variance, size=size)
            pareto_signal = (numpy.random.pareto(a=4, size=size) + mean) * variance
            data_array = numpy.add(normal_signal,pareto_signal)

        noise_signal = [{'step': index, 'value': item} for index, item in enumerate(data_array)]
        return noise_signal
