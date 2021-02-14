import math

import numpy


class NoiseSignal:
    step = 'step'
    value = 'value'
    NORMAL = 'NORMAL'
    PARETO = 'PARETO'
    SIN = 'SIN'
    SUM = 'SUM'
    default_size = 100
    default_mean = 0.0
    default_variance = 1.0
    default_noise_type = NORMAL


    def get_noise(self, size=None, mean=None, variance=None, noise_type=None):
        size = self.default_size if size == None else size
        mean = self.default_mean if mean == None else mean
        variance = self.default_variance if variance == None else variance
        noise_type = self.default_noise_type if noise_type == None else noise_type

        noise_signal = []

        if noise_type == self.NORMAL:
            noise_signal = numpy.random.normal(loc=mean, scale=variance / 3, size=size)

        if noise_type == self.PARETO:
            noise_signal = (numpy.random.pareto(a=2.5, size=size) * variance / 3) + mean

        if noise_type == self.SIN:
            noise_signal = (numpy.sin(numpy.linspace(0, 4*numpy.pi, size)) * variance) + mean
        
        if noise_type == self.SUM:
            normal_signal = numpy.random.normal(loc=mean, scale=variance / 3, size=size)
            pareto_signal = (numpy.random.pareto(a=4, size=size) * variance / 3) + mean
            sinus_signal = (numpy.sin(numpy.linspace(0, 4*numpy.pi, size)) * variance) + mean
            normal_pareto_signal = numpy.add(normal_signal, pareto_signal)
            noise_signal = numpy.add(normal_pareto_signal, sinus_signal)

        return noise_signal.tolist()
