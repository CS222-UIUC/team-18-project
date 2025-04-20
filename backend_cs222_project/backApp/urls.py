# # myproject/urls.py
from django.contrib import admin
#from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('', include('minorproject.urls')),   
# ]

# backApp/urls.py

from django.urls import path, include
from . import backend

urlpatterns = [
    path('', backend.home, name='home'),  # Add root URL pattern
    path('admin/', admin.site.urls),
    path('api/classNames/', backend.classNames, name='classNames'),
    path('api/minor_progress/<str:major>/', backend.minor_progress, name='minor_progress'),
]