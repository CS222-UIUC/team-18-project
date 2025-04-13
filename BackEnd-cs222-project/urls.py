from django.urls import path
from . import backend  

urlpatterns = [
    path('progress/minor/<str:major>/', backend.minor_progress, name='minor_progress'),
]