from django.urls import path 
from . import views

urlpatterns = [
    path( 'api/results/', views.renderGeoJson ),
]