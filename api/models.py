from django.db import models


class NoiseModel(models.Model):
    array = models.JSONField(null=True)
    mean = models.FloatField(null=True, default=0.0)
    variance = models.FloatField(null=True, default=1.0)

