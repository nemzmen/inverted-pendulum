import input


class MyPID:
    last_err = 0.0
    integral = 0.0
    derivative = 0.0
    __min_pid = -180.0
    __max_pid = 180.0

    def do_PID(self, kp, ki, kd, wanted_val, current_val):
        dt = input.Tp
        err = wanted_val - current_val
        if ki != 0:
            self.integral += err * dt
        self.derivative = (err - self.last_err) / dt
        self.last_err = err

        pid = (kp * err) + (ki * self.integral) + (kd * self.derivative)

        if pid > self.__max_pid:
            pid = self.__max_pid
            if ki != 0:
                self.integral -= err * dt
        elif pid < self.__min_pid:
            pid = self.__min_pid
            if ki != 0:
                self.integral -= err * dt
        return pid
