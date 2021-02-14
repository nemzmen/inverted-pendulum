from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..helpers import check_float
from .models import NoiseModel
from .serializers import NoiseSerializer
from .utilities.noiseSignal import NoiseSignal


class NoiseView(APIView):

    serializer_class = NoiseSerializer
    simulation_time = 'simulation_time'
    sampling_time = 'sampling_time'
    mean = 'mean'
    signal = 'signal'
    variance = 'variance'
    noise_type = 'noise_type'

    def post(self, request, format=None):
        readed_variable_simulation_time = request.data.get(self.simulation_time, None)
        readed_variable_sampling_time = request.data.get(self.sampling_time, None)
        readed_variable_mean = request.data.get(self.mean, None)
        readed_variable_variance = request.data.get(self.variance, None)
        readed_variable_noise_type = request.data.get(self.noise_type, None)

        if not check_float(readed_variable_simulation_time):
            return Response({'Type error': 'cannot convert simulation_time to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_sampling_time):
            return Response({'Type error': 'cannot convert sampling_time to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_mean):
            return Response({'Type error': 'cannot convert mean to float'}, status=status.HTTP_400_BAD_REQUEST)
        if not check_float(readed_variable_variance):
            return Response({'Type error': 'cannot convert variance to float'}, status=status.HTTP_400_BAD_REQUEST)
        if type(readed_variable_noise_type) != str:
            return Response({'Type error': 'noise_type must be a string'}, status=status.HTTP_400_BAD_REQUEST)
        
        simulation_time = float(readed_variable_simulation_time)
        sampling_time = float(readed_variable_sampling_time)
        mean = float(readed_variable_mean)
        variance = float(readed_variable_variance)
        noise_type = readed_variable_noise_type

        size = int(simulation_time / sampling_time)
        noise_signal = NoiseSignal().get_noise(size=size, mean=mean, variance=variance, noise_type=noise_type)
        array={self.signal: noise_signal}

        queryset = NoiseModel.objects.all()

        if len(queryset) > 0:
            noise = queryset.first()
            noise.array = array
            noise.sampling_time = sampling_time
            noise.mean = mean
            noise.variance = variance
            noise.noise_type = noise_type
            noise.save()
            return Response(self.serializer_class(noise).data, status=status.HTTP_200_OK)

        noise = NoiseModel(array=array, sampling_time=sampling_time, mean=mean, variance=variance, noise_type=noise_type)
        noise.save()
        return Response(self.serializer_class(noise).data, status=status.HTTP_201_CREATED)
