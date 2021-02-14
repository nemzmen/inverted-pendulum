from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..helpers import check_float, check_int
from .models import SimulationModel
from .serializers import SimulationSerializer
from .utilities.fuzzyController import FuzzyController
from .utilities.invertedPendulum import InvertedPendulum
from .utilities.pidController import PIDController
from .utilities.proportionalController import ProportionalController
from .utilities.simulation import Simulation


class SimulationView(APIView):
    serializer_class = SimulationSerializer
    simulation_time = 'simulation_time'
    sampling_time = 'sampling_time'
    timeout = 'timeout'
    pendulum_mass = 'pendulum_mass'
    pendulum_length = 'pendulum_length'
    pendulum_friction = 'pendulum_friction'
    max_moment = 'max_moment'
    p_value_of_p_controller = 'p_value_of_p_controller'
    p_value_of_pid_controller = 'p_value_of_pid_controller'
    i_value_of_pid_controller = 'i_value_of_pid_controller'
    d_value_of_pid_controller = 'd_value_of_pid_controller'
    fuzzy_error_min = 'fuzzy_error_min'
    fuzzy_derivative_min = 'fuzzy_derivative_min'
    fuzzy_control_min = 'fuzzy_control_min'
    fuzzy_error_max = 'fuzzy_error_max'
    fuzzy_derivative_max = 'fuzzy_derivative_max'
    fuzzy_control_max = 'fuzzy_control_max'


    def post(self, request, format=None):
        readed_variable_simulation_time = request.data.get(self.simulation_time, None)
        readed_variable_sampling_time = request.data.get(self.sampling_time, None)
        readed_variable_timeout = request.data.get(self.timeout, None)
        readed_variable_pendulum_mass = request.data.get(self.pendulum_mass, None)
        readed_variable_pendulum_length = request.data.get(self.pendulum_length, None)
        readed_variable_pendulum_friction = request.data.get(self.pendulum_friction, None)
        readed_variable_max_moment = request.data.get(self.max_moment, None)
        readed_variable_p_value_of_p_controller = request.data.get(self.p_value_of_p_controller, None)
        readed_variable_p_value_of_pid_controller = request.data.get(self.p_value_of_pid_controller, None)
        readed_variable_i_value_of_pid_controller = request.data.get(self.i_value_of_pid_controller, None)
        readed_variable_d_value_of_pid_controller = request.data.get(self.d_value_of_pid_controller, None)
        readed_variable_fuzzy_error_min = request.data.get(self.fuzzy_error_min, None)
        readed_variable_fuzzy_derivative_min = request.data.get(self.fuzzy_derivative_min, None)
        readed_variable_fuzzy_control_min = request.data.get(self.fuzzy_control_min, None)
        readed_variable_fuzzy_error_max = request.data.get(self.fuzzy_error_max, None)
        readed_variable_fuzzy_derivative_max = request.data.get(self.fuzzy_derivative_max, None)
        readed_variable_fuzzy_control_max = request.data.get(self.fuzzy_control_max, None)

        if not check_float(readed_variable_simulation_time):
            return Response({'Type error': 'cannot convert simulation_time to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_sampling_time):
            return Response({'Type error': 'cannot convert sampling_time to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_int(readed_variable_timeout):
            return Response({'Type error': 'cannot convert timeout to int'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_pendulum_mass):
            return Response({'Type error': 'cannot convert pendulum_mass to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_pendulum_length):
            return Response({'Type error': 'cannot convert pendulum_length to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_pendulum_friction):
            return Response({'Type error': 'cannot convert pendulum_friction to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_max_moment):
            return Response({'Type error': 'cannot convert max_moment to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_p_value_of_p_controller):
            return Response({'Type error': 'cannot convert p_value_of_p_controller to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_p_value_of_pid_controller):
            return Response({'Type error': 'cannot convert p_value_of_pid_controller to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_i_value_of_pid_controller):
            return Response({'Type error': 'cannot convert i_value_of_pid_controller to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_d_value_of_pid_controller):
            return Response({'Type error': 'cannot convert d_value_of_pid_controller to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_fuzzy_error_min):
            return Response({'Type error': 'cannot convert fuzzy_error_min to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_fuzzy_derivative_min):
            return Response({'Type error': 'cannot convert fuzzy_derivative_min to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_fuzzy_control_min):
            return Response({'Type error': 'cannot convert fuzzy_control_min to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_fuzzy_error_max):
            return Response({'Type error': 'cannot convert fuzzy_error_max to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_fuzzy_derivative_max):
            return Response({'Type error': 'cannot convert fuzzy_derivative_max to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_fuzzy_control_max):
            return Response({'Type error': 'cannot convert fuzzy_control_max to float'}, status=status.HTTP_400_BAD_REQUEST)

        simulation_time = float(readed_variable_simulation_time)
        sampling_time = float(readed_variable_sampling_time)
        timeout = int(readed_variable_timeout)
        pendulum_mass = float(readed_variable_pendulum_mass)
        pendulum_length = float(readed_variable_pendulum_length)
        pendulum_friction = float(readed_variable_pendulum_friction)
        max_moment = float(readed_variable_max_moment)
        p_value_of_p_controller = float(readed_variable_p_value_of_p_controller)
        p_value_of_pid_controller = float(readed_variable_p_value_of_pid_controller)
        i_value_of_pid_controller = float(readed_variable_i_value_of_pid_controller)
        d_value_of_pid_controller = float(readed_variable_d_value_of_pid_controller)
        fuzzy_error_min = float(readed_variable_fuzzy_error_min)
        fuzzy_derivative_min = float(readed_variable_fuzzy_derivative_min)
        fuzzy_control_min = float(readed_variable_fuzzy_control_min)
        fuzzy_error_max = float(readed_variable_fuzzy_error_max)
        fuzzy_derivative_max = float(readed_variable_fuzzy_derivative_max)
        fuzzy_control_max = float(readed_variable_fuzzy_control_max)

        fuzzy_error_min
        fuzzy_derivative_min
        fuzzy_control_min
        fuzzy_error_max
        fuzzy_derivative_max
        fuzzy_control_max

        # create pendulum objects
        p_pendulum = InvertedPendulum(sampling_time, pendulum_mass, pendulum_length, pendulum_friction)
        pid_pendulum = InvertedPendulum(sampling_time, pendulum_mass, pendulum_length, pendulum_friction)
        fuzzy_pendulum = InvertedPendulum(sampling_time, pendulum_mass, pendulum_length, pendulum_friction)

        # create p controller
        p_controller = ProportionalController(p_value_of_p_controller)

        # create pid controller
        pid_controller = PIDController(
                sampling_time,
                p_value_of_pid_controller,
                i_value_of_pid_controller,
                d_value_of_pid_controller)

        # create fuzzy controller
        fuzzy_controller = FuzzyController(
                sampling_time,
                fuzzy_error_min,
                fuzzy_derivative_min,
                fuzzy_control_min,
                fuzzy_error_max,
                fuzzy_derivative_max,
                fuzzy_control_max)

        # create simulation object
        simulation = Simulation(
                simulation_time,
                sampling_time,
                timeout,
                pendulum_mass,
                pendulum_length,
                max_moment)

        # get simulations data
        p_simulation_data = simulation.get_simulation_data(p_pendulum, p_controller)
        pid_simulation_data = simulation.get_simulation_data(pid_pendulum, pid_controller)
        fuzzy_simulation_data = simulation.get_simulation_data(fuzzy_pendulum, fuzzy_controller)

        # save data in object
        array = dict(
                sampling_time=sampling_time,
                proportional=p_simulation_data,
                pid=pid_simulation_data,
                fuzzy=fuzzy_simulation_data)

        # get data from DB
        queryset = SimulationModel.objects.all()

        if len(queryset) > 0:
            simulations = queryset.first()
            simulations.array = array
            simulations.save()
            return Response(self.serializer_class(simulations).data, status=status.HTTP_200_OK)

        simulations = SimulationModel(array=array)
        simulations.save()
        return Response(self.serializer_class(simulations).data, status=status.HTTP_201_CREATED)
