from django.db import models
from django.contrib.postgres.fields import ArrayField


class NoiseModel(models.Model):
    # signal = ArrayField(models.IntegerField(default=0))
    variance = models.IntegerField(null=False, default=1)
    test = ArrayField(models.IntegerField(null=False, default=1))
