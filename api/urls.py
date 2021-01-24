from django.urls import path
from .views import PostNoiseView, GetNoiseView


urlpatterns = [
  path('create', PostNoiseView.as_view()),
  path('noise', GetNoiseView.as_view())
]
