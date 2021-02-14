from . import default


class PIDController:
    last_err_signal = default.last_err_signal
    proportional_value = default.proportional_value
    integral_value = default.integral_value
    derivative_value = default.derivative_value


    def __init__(self, sampling_time=None, proportional=None, integral=None, derivative=None):
        self.sampling_time = default.sampling_time if sampling_time == None else sampling_time
        self.proportional = default.proportional if proportional == None else proportional
        self.integral = default.integral if integral == None else integral
        self.derivative = default.derivative if derivative == None else derivative


    def get_output(self, error_signal):
        kp = self.proportional
        ki = self.integral
        kd = self.derivative
        dt = self.sampling_time
        err = error_signal


        # obliczenia sygnałów regulatora
        if kp != 0:
            self.proportional_value = err
        if ki != 0:
            self.integral_value += err * dt
        if kd != 0:
            self.derivative_value = (err - self.last_err_signal) / dt

        # obliczenie sygnału wyjściowego
        control_signal = (kp * self.proportional_value) + (ki * self.integral_value) + (kd * self.derivative_value)

        # uchyb zapamiętany dla celów wyliczeń kolejnej iteracji
        self.last_err_signal = err

        print(control_signal)

        return control_signal
