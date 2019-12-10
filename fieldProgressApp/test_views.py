from . import views
from django.test import TestCase
import os
import json
from requests.models import Request

class RenderValidGeoJSON(TestCase):

    def setUp(self):
        pass

    def test_render_valid_geojson(self):
        jsonRes = views.renderGeoJson(None)
        self.assertIsNotNone(jsonRes)

        geojson = 'all_voters.geojson'
        self.assertTrue(os.path.exists('all_voters.geojson'))

        content = jsonRes.content
        jsonContent = json.loads(content)

        self.assertEqual(jsonContent['type'], 'FeatureCollection', 'GeoJSON type is incorrect')
        self.assertGreater(len(jsonContent['features']), 100, 'Should have more than 100 voters total')
