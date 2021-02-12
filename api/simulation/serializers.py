from rest_framework import serializers
from .models import SimulationModel


class SimulationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimulationModel
        fields = ('array',)
