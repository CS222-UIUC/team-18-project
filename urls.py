from django.contrib import admin
from django.urls import path, include 

urlpatterns = [
    path('admin/', admin.site.urls),  # Default admin URL
    path('api/', include('myapp.urls')),  # Include URLs from your app (myapp)
]