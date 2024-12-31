# api/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('repositories/', views.get_repositories, name='get_repositories'),
    path('languages/', views.get_languages, name='get_languages'),
]
