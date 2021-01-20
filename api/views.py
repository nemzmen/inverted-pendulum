from django.shortcuts import render
from rest_framework import generics
from .serializers import SampleSerializer
from .models import Sample


class SampleView(generics.ListAPIView):
    serializer_class = SampleSerializer
    queryset = Sample.objects.all()
