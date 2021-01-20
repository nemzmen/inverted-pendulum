from django.db import models


class Sample(models.Model):
    sample_field = models.CharField(max_length=32)
    