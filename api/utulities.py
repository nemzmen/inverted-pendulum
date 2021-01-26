import numpy


class Signal:
    def __init__(self):
        self.size = 100
        self.mean = 0.0
        self.variance = 1.0

    def get_noise(self, mean=None, size=None, variance=None):
        size = self.size if size == None else size
        mean = self.mean if mean == None else mean
        variance = self.variance if variance == None else variance

        noise_signal = numpy.random.normal(loc=mean, scale=variance, size=size)

        return noise_signal.tolist()
