from . import main
from django.test import TestCase
import json
import os


class Main(TestCase):

    mapbox_token = None

    def setUp(self):

        # Really should be reading this from a file or something
        self.mapbox_token = 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'

        if os.path.exists('cluster.geojson'):
            os.remove('cluster.geojson')

    def test_cut_sufficient_volunteers_and_voters(self):
        json_data = {
            'precinctID': '130960',
            'volunteers': [
                {
                    'volunteerName': 'Kevin',
                    'availability': '0.5'
                },
                {
                    'volunteerName': 'Uche',
                    'availability': '0.2'
                }
            ]
        }

        self.assertFalse(os.path.exists('cluster.geojson'), 'Cluster GeoJSON file should not exist yet')

        vhr = main.VehicleRouting(json_data['volunteers'], self.mapbox_token, len(json_data['volunteers']), json_data['precinctID'])
        vhr.cut()

        with open('cluster.geojson', 'r') as f:
            data=json.load(f)

        self.assertIsNotNone(json.dumps(data))
        self.assertEqual(data['type'], 'FeatureCollection', 'GeoJSON response type is incorrect')
        self.assertGreater(len(data['features']), 0, 'Should have gotten some points back')

        # Make sure there are as many clusters as there are volunteers
        clustersFound = []
        for feature in data['features']:
            if 'cluster' in feature['properties']:
                if feature['properties']['cluster'] not in clustersFound:
                    clustersFound.append(feature['properties']['cluster'])
        
        self.assertEqual(len(json_data['volunteers']), len(clustersFound), 'There were an unequal number of volunteers and clusters')

    def test_cut_no_volunteers_sufficient_voters(self):
        json_data = {
            'precinctID': '130960',
            'volunteers': []
        }

        self.assertFalse(os.path.exists('cluster.geojson'), 'Cluster GeoJSON file should not exist yet')

        try:
            vhr = main.VehicleRouting(json_data['volunteers'], self.mapbox_token, len(json_data['volunteers']), json_data['precinctID'])
            vhr.cut()
        except Exception as e:
            self.assertIsNotNone(e)

    def test_cut_no_volunteers_no_voters(self):
        json_data = {
            'precinctID': '',
            'volunteers': []
        }

        self.assertFalse(os.path.exists('cluster.geojson'), 'Cluster GeoJSON file should not exist yet')

        try:
            vhr = main.VehicleRouting(json_data['volunteers'], self.mapbox_token, len(json_data['volunteers']), json_data['precinctID'])
            vhr.cut()
        except Exception as e:
            self.assertIsNotNone(e)

    def test_cut_sufficient_volunteers_no_voters(self):
        json_data = {
            'precinctID': '',
            'volunteers': [
                {
                    'volunteerName': 'Kevin',
                    'availability': '0.5'
                },
                {
                    'volunteerName': 'Uche',
                    'availability': '0.2'
                }
            ]
        }

        self.assertFalse(os.path.exists('cluster.geojson'), 'Cluster GeoJSON file should not exist yet')

        try:
            vhr = main.VehicleRouting(json_data['volunteers'], self.mapbox_token, len(json_data['volunteers']), json_data['precinctID'])
            vhr.cut()
        except Exception as e:
            self.assertIsNotNone(e)
