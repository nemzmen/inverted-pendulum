import math

from . import default


class InvertedPendulum:
    output_signal = default.output_signal
    pendulum_speed = default.pendulum_speed
    pendulum_acceleration = default.pendulum_acceleration


    def __init__(self, sampling_time=None, pendulum_mass=None, pendulum_length=None, pendulum_friction=None):
        self.sampling_time = default.sampling_time if sampling_time == None else sampling_time
        self.pendulum_mass = default.pendulum_mass if pendulum_mass == None else pendulum_mass
        self.pendulum_length = default.pendulum_length if pendulum_length == None else pendulum_length
        self.pendulum_friction = default.pendulum_friction if pendulum_friction == None else pendulum_friction

        self.pendulum_inertia = self.pendulum_mass * (self.pendulum_length ** 2)
        self.mgl_ratio = self.pendulum_mass * default.gravity_acceleration * self.pendulum_length


    def get_output(self, external_moment):
        gravity_moment = math.sin(self.output_signal) * self.mgl_ratio          # moment grawitacji (Mg)
        friction_moment = self.pendulum_friction * self.pendulum_speed          # moment tarcia (Mt)

        moments_sum = external_moment + gravity_moment - friction_moment        # suma momentów (M)

        self.pendulum_acceleration = moments_sum / self.pendulum_inertia        # przyśpieszenie wahadła (ddx)
        self.pendulum_speed += self.pendulum_acceleration * self.sampling_time  # prędkość wahadła (dx)
        self.output_signal += self.pendulum_speed * self.sampling_time          # kąt wahadła (x)
        
        return self.output_signal
