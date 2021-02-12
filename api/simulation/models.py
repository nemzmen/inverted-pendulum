from django.db import models


class SimulationModel(models.Model):
    array = models.JSONField(null=True)
