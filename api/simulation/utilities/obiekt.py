import math
import PID
import input
import numpy as np
import matplotlib.pyplot as plt


class InvertedPendulum:
    m = input.m                 #masa wahadła
    I = input.I                 #bezwładność wahadła
    l = input.l                 #długość wahadła
    Tp = input.Tp               #okres próbkowania
    t_symu = input.t_symu       #czas symulacji
    xz = input.xz               #kąt zadany
    x = 90                      #aktualny kąt wahadła
    x0 = x1 = 90                #warunki początkowy
    dx = 0.0                    #prędkość wahadła
    __g = 9.80665               #grawitacja
    xe = xz-x                   #uchyb
    R = xe                      #wyjscie regulatora - wartość bez regulacji
    Mz = input.Mz               #moement zakłócający
    f = 0.01                    #współczynnik tarcia
    x_values = [x0, x1]         #tablica ostatnich wartości kąta wahadła
    wanted_val = [xz, xz]
    Mt = -dx*f                                   #moment tarcia
    Mg = math.sin(math.radians(x))*m*__g*l       #moment grawitacyjny
    Mkt = dx*f                                   #moment kompensacji tarcia
    Ms = R + Mkt                                 #moment sterujacy

    def __init__(self):
        self.pid = PID.MyPID()
        self.x_values = [self.x0, self.x1]      #tablica ostatnich wartości kąta wahadła

    def obj_pid(self, kp, ki, kd):
        T = self.Tp
        self.xe = round(self.xz - self.x, 5)                                                        # uchyb
        wanted_value = self.xz
        current_value = self.x
        self.R = self.pid.do_PID(kp, ki, kd, wanted_value, current_value)
        #self.R = 0
        #self.R = self.xe
        self.dx = round((round(self.x, 5) - self.x_values[len(self.x_values)-1])*T, 5)
        self.Mt = (- self.dx * self.f)                                                              # moment tarcia
        self.Mkt = self.dx * self.f                                                                 # moment kompensacji tarcia
        self.Mg = math.sin(math.radians(self.x)) * self.m * self.__g * self.l                       # moment grawitacyjny
        self.Ms = round(self.R + self.Mkt, 5)                                                       # moment sterujacy

        # ******************** Model wahadła - równanie *****************************************
        self.x = (2-(self.f*T)/self.I)*self.x_values[len(self.x_values)-1] + (((self.f*T)/self.I)-1)*self.x_values[len(self.x_values)-2] + ((self.m*self.__g*self.l*T*T)/self.I)*math.sin(math.radians(self.x_values[len(self.x_values)-2])) + ((T*T)/self.I)*self.Mz + ((T*T)/self.I)*self.Ms
        self.x_values.append(round(self.x, 5))
        self.wanted_val.append(self.xz)
        # ************************************************************************************

    def just_obj(self):
        T = self.Tp
        self.xe = round(self.xz - self.x, 5)                                                        # uchyb
        #self.R = 0
        self.R = self.xe
        self.dx = round((round(self.x, 5) - self.x_values[len(self.x_values)-1])*T, 5)
        self.Mt = (- self.dx * self.f)                                                              # moment tarcia
        self.Mkt = self.dx * self.f                                                                 # moment kompensacji tarcia
        self.Mg = math.sin(math.radians(self.x)) * self.m * self.__g * self.l                       # moment grawitacyjny
        self.Ms = round(self.R + self.Mkt, 5)                                                       # moment sterujacy

        # ******************** Model wahadła - równanie *****************************************
        self.x = (2-(self.f*T)/self.I)*self.x_values[len(self.x_values)-1] + (((self.f*T)/self.I)-1)*self.x_values[len(self.x_values)-2] + ((self.m*self.__g*self.l*T*T)/self.I)*math.sin(math.radians(self.x_values[len(self.x_values)-2])) + ((T*T)/self.I)*self.Mz + ((T*T)/self.I)*self.Ms
        self.x_values.append(round(self.x, 5))


MyPendulumPID = InvertedPendulum()
MyJustPendulum = InvertedPendulum()
OX = np.arange(0, input.t_symu)
for n in range(0, input.t_symu-2):
    MyPendulumPID.obj_pid(input.Kp, input.Ki, input.Kd)
    MyJustPendulum.just_obj()

    # ********************* Debug *******************
    """print('pętla', n)
    print('wartość początkowa', MyPendulumPID.x0)
    print('wartość zadana', MyPendulumPID.xz)
    print('uchyb', MyPendulumPID.xe)
    print('wartość bieżąca', MyPendulumPID.x)
    print('wyjscie regulatora', MyPendulumPID.R)
    print('Moment sterujący', MyPendulumPID.Ms)
    print('Moment tarcia', MyPendulumPID.Mt)
    print('Moment redukcji', MyPendulumPID.Mkt)
    print('Moment zakl', MyPendulumPID.Mz)
    print('Moment graw', MyPendulumPID.Mg)
    print('dx', MyPendulumPID.dx)
    #print('moment kompensacji tarcia', MyPendulum.Mkt)
    print('------------------------')"""

plt.plot(OX, MyPendulumPID.wanted_val, label='setpoint', color='g')
plt.plot(OX, MyPendulumPID.x_values, label='PID', color='r')
plt.plot(OX, MyJustPendulum.x_values, label='object', color='b')

plt.show()
