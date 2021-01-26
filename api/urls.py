from django.urls import path
from .views import NoiseView


urlpatterns = [
  path('noise', NoiseView.as_view()),
]
