from . import default


class PIDController:
    def __init__(self, sampling_time=None, proportional=None, integral=None, derivative=None):
        self.sampling_time = default.sampling_time if sampling_time == None else sampling_time
        self.proportional = default.proportional if proportional == None else proportional
        self.integral = default.integral if integral == None else integral
        self.derivative = default.derivative if derivative == None else derivative


    def get_output(self, error_signal):
        # realizacja regulatora pid

        return error_signal * 1.2
