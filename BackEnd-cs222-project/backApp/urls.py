# # myproject/urls.py
# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('', include('minorproject.urls')), 
# ]

# backApp/urls.py
from django.urls import path
from . import backend

urlpatterns = [
    path('', backend.home, name='home'),
    path('api/classNames/', backend.classNames, name='classNames'),
    path('api/minor_progress/', backend.minor_progress, name='minor_progress'),
]