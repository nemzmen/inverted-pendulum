import math
import random

from . import default
from .fuzzyController import FuzzyController
from .invertedPendulum import InvertedPendulum
from .pidController import PIDController
from .proportionalController import ProportionalController


class Simulation:

    def __init__(self, simulation_time=None, sampling_time=None, timeout=None, pendulum_mass=None, pendulum_length=None):
        self.simulation_time = default.simulation_time if simulation_time == None else simulation_time
        self.sampling_time = default.sampling_time if sampling_time == None else sampling_time
        self.timeout = default.timeout if timeout == None else timeout
        self.pendulum_mass = default.pendulum_mass if pendulum_mass == None else pendulum_mass
        self.pendulum_length = default.pendulum_length if pendulum_length == None else pendulum_length

        self.data_length = int(self.simulation_time / self.sampling_time)
        self.mgl_ratio = self.pendulum_mass * default.gravity_acceleration * self.pendulum_length


    def radian_to_degree(self, radian):
        return radian * 180 / math.pi


    def get_simulation_data(self, pendulum, controller):
        signal = []
        output_signal = default.output_signal
        control_signal_register = [0] * max(self.timeout, 1)

        for _ in range(self.data_length):
            signal.append(self.radian_to_degree(output_signal))                     # dodanie kąta wychylenia do tablicy
            error_signal = default.setpoint - output_signal                         # uchyb sygnału (xe)

            control_signal = controller.get_output(error_signal)                    # wyjście regulatora (xs)
            control_signal_register.pop()                                           # usunięcie ostatniego elementu rejestru
            control_signal_register.insert(0, control_signal)                       # dodanie elementu do rejestru
            delayed_control_signal = control_signal_register[-1]                    # pobranie ostatniego elementu rejestru

            control_moment = math.sin(delayed_control_signal) * self.mgl_ratio      # moment sterujący (Ms)
            noise_moment = (random.random() - 0.5) / 10                             # moment zakłócający (Mz) (pobrać z bazy danych)

            external_moment = control_moment + noise_moment                         # suma momentów zewnętrznych
            output_signal = pendulum.get_output(external_moment)                    # kąt wychylenia

            # wyliczyc tutaj parametry jakosci i zwrócić dodatkowo w dict

        return dict(signal=signal)
