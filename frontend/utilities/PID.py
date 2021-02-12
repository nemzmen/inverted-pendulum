import time

current_milli_time = lambda: int(round(time.time() * 1000))

class MyPID:
    last_err = 0.0
    integral = 0.0
    derivative = 0.0
    __last_time = current_milli_time()
    __min_pid = -180.0
    __max_pid = 180.0
    

    def __init__(self, kp, ki, kd):
        self.kp = kp
        self.ki = ki
        self.kd = kd
    
    def do_PID(self, wanted_val, current_val):
        #current_time = current_milli_time()
        #dt = (current_time - self.__last_time)/1000
        #self.__last_time = current_time
        dt = 0.001

        # e
        err = wanted_val - current_val
        if self.ki != 0:
            self.integral += err * dt
            #print('integral', self.integral)                        # -------------DEBUG ---------------
        self.derivative = (err - self.last_err) / dt
        #print('deritave', self.derivative)                          # -------------DEBUG ---------------
        self.last_err = err
        #print('last error in pid', self.last_err)                   # -------------DEBUG ---------------

        pid = (self.kp * err) + (self.ki * self.integral) + (self.kd * self.derivative)

        #print('last PID in pid', pid)                                # -------------DEBUG ---------------

        if pid > self.__max_pid:
            pid = self.__max_pid
            if self.ki != 0:
                self.integral -= err * dt
        elif pid < self.__min_pid:
            pid = self.__min_pid
            if self.ki != 0:
                self.integral -= err * dt
        return pid