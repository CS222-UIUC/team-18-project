from django.urls import path
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'BackEnd-cs222-project'))
from backend import classNames
    
urlpatterns = [
    # Define your URL patterns here
    path('api/classNames/', classNames, name='class-names'),
]