from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import NoiseModel
from .serializers import NoiseSerializer
from .utulities import Signal


class NoiseView(APIView):
    serializer_class = NoiseSerializer
    size = 'size'
    mean = 'mean'
    signal = 'signal'
    variance = 'variance'

    def post(self, request, format=None):
        queryset = NoiseModel.objects.all()

        size = request.data.get(self.size, None)
        mean = request.data.get(self.mean, None)
        variance = request.data.get(self.variance, None)
        
        noise_signal = Signal().get_noise(size=size, mean=mean, variance=variance)
        array={self.signal: noise_signal}

        if len(queryset) == 0:
            noise = NoiseModel(array=array, mean=mean, variance=variance)
            noise.save()
            return Response(self.serializer_class(noise).data, status=status.HTTP_201_CREATED)

        else:
            noise = queryset.first()
            noise.array = array
            noise.mean = mean
            noise.variance = variance
            noise.save()
            return Response(self.serializer_class(noise).data, status=status.HTTP_200_OK)
