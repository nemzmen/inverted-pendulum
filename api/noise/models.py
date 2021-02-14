from django.db import models


class NoiseModel(models.Model):
    array = models.JSONField(null=True)
    sampling_time = models.FloatField(null=True, default=0.05)
    mean = models.FloatField(null=True, default=0.0)
    variance = models.FloatField(null=True, default=1.0)
    noise_type = models.CharField(max_length=16, default='')
