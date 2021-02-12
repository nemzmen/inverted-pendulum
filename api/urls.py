from django.urls import path
from .noise.views import NoiseView
from .simulation.views import SimulationView


urlpatterns = [
  path('noise', NoiseView.as_view()),
  path('simulation', SimulationView.as_view()),
]
