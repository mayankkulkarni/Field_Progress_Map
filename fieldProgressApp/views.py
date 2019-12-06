from django.shortcuts import render
from . import FPM_prototype as fpm
from django.http import JsonResponse
import json

# Create your views here.
def renderGeoJson(request):
	fpm.main()
	with open('points1.geojson', 'r') as f:
		data=json.load(f)
	return JsonResponse(data)
