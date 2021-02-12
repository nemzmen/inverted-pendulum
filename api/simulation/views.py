from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SimulationModel
from .serializers import SimulationSerializer


class SimulationView(APIView):
    serializer_class = SimulationSerializer


    def post(self, request, format=None):
        return Response({'Message': 'tutaj będą fajne dane'}, status=status.HTTP_200_OK)
