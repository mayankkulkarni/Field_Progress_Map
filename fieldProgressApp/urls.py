from django.urls import path 
from . import views

urlpatterns = [
	path('api/clusters/', views.renderClusteredGeoJson),
    path( 'api/results/', views.renderGeoJson)

]