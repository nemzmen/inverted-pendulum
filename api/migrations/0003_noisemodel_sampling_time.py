# Generated by Django 3.1.5 on 2021-02-13 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_simulationmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='noisemodel',
            name='sampling_time',
            field=models.FloatField(default=0.05, null=True),
        ),
    ]
