import math
import random

from ...noise.models import NoiseModel
from . import default
from .fuzzyController import FuzzyController
from .invertedPendulum import InvertedPendulum
from .pidController import PIDController
from .proportionalController import ProportionalController


class Simulation:
    signal = 'signal'

    def __init__(
            self,
            simulation_time=None,
            sampling_time=None,
            timeout=None,
            pendulum_mass=None,
            pendulum_length=None,
            max_moment=None):

        self.simulation_time = default.simulation_time if simulation_time == None else simulation_time
        self.sampling_time = default.sampling_time if sampling_time == None else sampling_time
        self.timeout = default.timeout if timeout == None else timeout
        self.pendulum_mass = default.pendulum_mass if pendulum_mass == None else pendulum_mass
        self.pendulum_length = default.pendulum_length if pendulum_length == None else pendulum_length
        self.max_moment = default.max_moment if max_moment == None else max_moment

        self.data_length = int(self.simulation_time / self.sampling_time)
        self.mgl_ratio = self.pendulum_mass * default.gravity_acceleration * self.pendulum_length


    def radian_to_degree(self, radian):
        return radian * 180 / math.pi

    
    def moment_limit(self, moment):
        if moment > self.max_moment:
            return self.max_moment

        if moment < -1 * self.max_moment:
            return -1 * self.max_moment
            
        return moment

    
    def get_noise_signal(self, length):
        queryset = NoiseModel.objects.all()
        if len(queryset) == 0:
            return [0] * length

        output_signal = []
        noise = queryset.first()
        signal = noise.array[self.signal]
        ratio = len(signal) / length

        for i in range(length):
            signal_index = int(i * ratio)
            output_signal.append(signal[signal_index])

        return output_signal


    def get_simulation_data(self, pendulum, controller):
        error_abs = 0
        error_square = 0
        control_abs = 0
        control_square = 0
        signal = []

        output_signal = default.output_signal
        control_signal_register = [0] * max(self.timeout, 1)
        noise_signal = self.get_noise_signal(self.data_length)

        for i in range(self.data_length):
            # dodanie danych do tablicy
            signal.append(self.radian_to_degree(output_signal))

            # obliczenia symulacji
            error_signal = default.setpoint - output_signal                                         # uchyb sygnału (xe)
            control_signal = controller.get_output(error_signal)                                    # wyjście regulatora (xs)
            control_signal_register.pop()                                                           # usunięcie ostatniego elementu rejestru
            control_signal_register.insert(0, control_signal)                                       # dodanie elementu do rejestru
            delayed_control_signal = control_signal_register[-1]                                    # pobranie ostatniego elementu rejestru
            control_moment = self.moment_limit(math.sin(delayed_control_signal) * self.mgl_ratio)   # moment sterujący (Ms)
            noise_moment = noise_signal[i]                                                          # moment zakłócający (Mz)
            external_moment = control_moment + noise_moment                                         # suma momentów zewnętrznych
            output_signal = pendulum.get_output(external_moment)                                    # kąt wychylenia

            # wyliczenie parametrów jakości
            error_abs += abs(error_signal) * self.sampling_time
            error_square += (error_signal ** 2) * self.sampling_time
            control_abs += abs(control_moment) * self.sampling_time
            control_square += (control_moment ** 2) * self.sampling_time

        return dict(
                signal=signal,
                error_abs=error_abs,
                error_square=error_square,
                control_abs=control_abs,
                control_square=control_square)
                
