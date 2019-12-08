from django.shortcuts import render
from . import FPM_prototype as fpm
from . import main 
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def renderGeoJson(request):
	data = fpm.get_voters_geojson()
	with open('all_voters.geojson', 'r') as f:
		data=json.load(f)
	return JsonResponse(data)

@csrf_exempt
def renderClusteredGeoJson(request):
	if request.method == 'POST':
		json_data = json.loads(request.body)
		mapbox_token = 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'
		print(json_data)
		print(json_data['volunteers'])
		print(json_data['precinctID'])
		vhr = main.VehicleRouting(json_data['volunteers'], mapbox_token, len(json_data['volunteers']), json_data['precinctID'])
		vhr.cut()
		with open('cluster.geojson', 'r') as f:
			data=json.load(f)
		return JsonResponse(data)

