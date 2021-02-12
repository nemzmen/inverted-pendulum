import time
import threading
import math
import PID
import input
import numpy as np
import matplotlib.pyplot as plt



current_milli_time = lambda: int(round(time.time() * 1000))

class InvertedPendulum:
    m = input.m                 #masa wahadła
    I =input.I                  #bezwładność wahadła
    l = input.l                 #długość wahadła
    Tp = 0.1 #input.Tp          #okres próbkowania
    t_symu = input.t_symu       #czas symulacji
    xz = 0                      #kąt zadany
    x = 90                      #aktualny kąt wahadła
    x0 = x1 = 90.0              #warunki początkowy
    dx= 0.0                     #prędkość wahadła
    #ddx= 0.0                   #przyspieszenie wahadła
    __g = 9.80665               #grawitacja
    xe= xz-x                    #uchyb
    R = xe                      #wyjscie regulatora - wartość bez regulacji
    M= 0.0                      #moment u podstawy
    Mz= input.Mz                #moement zakłócający
    f= 0.01                      #współczynnik tarcia
    x_values = [x0, x1]         # tablica ostatnich wartości kąta wahadła
    Mt= dx*f                    #moment tarcia
    Mg= math.sin(m*__g*l)       #moment grawitacyjny
    Mkt= dx*f                   #moment kompensacji tarcia
    Ms= Mkt+R*math.sin(m*__g*l)*xe            #moment sterujacy

    kp = input.Kp
    ki = input.Ki
    kd = input.Kd

    __last_time = current_milli_time()

    def __init__(self, kp, ki, kd):
        self.pid = PID.MyPID(kp, ki, kd)

    def obj(self):
        T = self.Tp
        self.xe = round(self.xz - self.x, 2)            # uchyb
        wanted_value = self.xz
        current_value = self.x
        #print('wyjscie regulatora', self.pid.do_PID(wanted_value, current_value))
        self.R = self.pid.do_PID(wanted_value, current_value)
        #print('R*xe', self.R*self.xe)
        self.dx = round((round(self.x, 2) - self.x_values[len(self.x_values)-2])*T, 2)
        self.Mt = (- self.dx * self.f)                      # moment tarcia
        self.Mkt = self.dx * self.f                     # moment kompensacji tarcia
        self.Mg = math.sin(self.x) * self.m * self.__g * self.l # moment grawitacyjny
        self.Ms = round(math.sin(self.xe*self.R) * self.m * self.__g * self.l + self.Mkt, 2)  # moment sterujacy

        # ******************** Model wahadła - równanie *****************************************
        print('---------', self.x)
        self.x = (2-(self.f*T)/self.I)*self.x_values[len(self.x_values)-2] + (((self.f*T)/self.I)-1)*self.x_values[len(self.x_values)-3] + ((self.m*self.__g*self.l*T*T)/self.I)*math.sin(self.x_values[len(self.x_values)-3]) + ((T*T)/self.I)*self.Mz + ((T*T)/self.I)*self.Ms
        self.x_values.append(round(self.x, 2))

        # ************************************************************************************


MyPendulum = InvertedPendulum(input.Kp, input.Ki, input.Kd)

OX = np.arange(0, 30)
for n in range(0, 28):
    MyPendulum.obj()
    # ********************* Debug *******************
    print('pętla', n)
    print('wartość początkowa', MyPendulum.x0)
    print('wartość zadana', MyPendulum.xz)
    print('uchyb', MyPendulum.xe)
    print('wartość bieżąca', MyPendulum.x)
    print('wyjscie regulatora', MyPendulum.pid.do_PID(MyPendulum.xz, MyPendulum.x))
    print('Monemnt sterujący', MyPendulum.Ms)
    print('dx', MyPendulum.dx)
    #print('moment kompensacji tarcia', MyPendulum.Mkt)

    print('------------------------')

plt.plot(OX, MyPendulum.x_values)
plt.show()
