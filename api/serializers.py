from rest_framework import serializers
from .models import NoiseModel


class NoiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoiseModel
        fields = ('variance', 'test')
