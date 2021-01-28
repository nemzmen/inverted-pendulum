from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import NoiseModel
from .serializers import NoiseSerializer
from .utulities import Signal
from .helpers import check_int, check_float


class NoiseView(APIView):
    serializer_class = NoiseSerializer
    size = 'size'
    mean = 'mean'
    signal = 'signal'
    variance = 'variance'
    noise_type = 'noise_type'

    def post(self, request, format=None):
        queryset = NoiseModel.objects.all()
        readed_variable_size = request.data.get(self.size, None)
        readed_variable_mean = request.data.get(self.mean, None)
        readed_variable_variance = request.data.get(self.variance, None)
        readed_variable_noise_type = request.data.get(self.noise_type, None)

        if not check_int(readed_variable_size):
            return Response({'Type error': 'cannot convert size to int'}, status=status.HTTP_400_BAD_REQUEST)

        if not check_float(readed_variable_mean):
            return Response({'Type error': 'cannot convert mean to float'}, status=status.HTTP_400_BAD_REQUEST)

        if not check_float(readed_variable_variance):
            return Response({'Type error': 'cannot convert variance to float'}, status=status.HTTP_400_BAD_REQUEST)

        if type(readed_variable_noise_type) != str:
            return Response({'Type error': 'noise_type must be a string'}, status=status.HTTP_400_BAD_REQUEST)
        
        size = int(readed_variable_size)
        mean = float(readed_variable_mean)
        variance = float(readed_variable_variance)
        noise_type = readed_variable_noise_type

        noise_signal = Signal().get_noise(size=size, mean=mean, variance=variance, noise_type=noise_type)
        array={self.signal: noise_signal}

        if len(queryset) == 0:
            noise = NoiseModel(array=array, mean=mean, variance=variance, noise_type=noise_type)
            noise.save()
            return Response(self.serializer_class(noise).data, status=status.HTTP_201_CREATED)

        else:
            noise = queryset.first()
            noise.array = array
            noise.mean = mean
            noise.variance = variance
            noise.noise_type = noise_type
            noise.save()
            return Response(self.serializer_class(noise).data, status=status.HTTP_200_OK)
