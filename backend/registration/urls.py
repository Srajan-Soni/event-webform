
from django.urls import path
from .views import create_registration

urlpatterns = [
    path('register/', create_registration, name='create_registration'),
  
]
