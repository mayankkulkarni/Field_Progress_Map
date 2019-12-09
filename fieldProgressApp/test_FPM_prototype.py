from django.test import TestCase
from . import FPM_prototype as fpm


class GetVotersGeoJSON(TestCase):
    
    def setUp(self):
        pass

    def test_voter_csv_corrupt(self):
        corruptCsv = 'fieldProgressApp/data/test/voters_corrupt'
        precinctJson = 'fieldProgressApp/data/precincts_sdcc_d6.json'
        gotException = False

        try:
            data = fpm.get_voters_geojson(corruptCsv, precinctJson)
        except Exception as e:
            self.assertIsNotNone(e, "Should have received an exception")
            gotException = True

        self.assertTrue(gotException, "Should have received an exception")

    def test_voter_csv_does_not_exist(self):
        nonExistentCsv = 'bleh/blah/goo.csv'
        precinctJson = 'fieldProgressApp/data/precincts_sdcc_d6.json'
        gotException = False

        try:
            data = fpm.get_voters_geojson(nonExistentCsv, precinctJson)
        except Exception as e:
            self.assertIsNotNone(e, "Should have received an exception")
            gotException = True

        self.assertTrue(gotException, "Should have received an exception")

    def test_voter_csv_none(self):
        noneCsv = None
        precinctJson = 'fieldProgressApp/data/precincts_sdcc_d6.json'
        gotException = False

        try:
            data = fpm.get_voters_geojson(noneCsv, precinctJson)
        except Exception as e:
            self.assertIsNotNone(e, "Should have received an exception")
            gotException = True

        self.assertTrue(gotException, "Should have received an exception")

    def test_precinct_json_corrupt(self):
        votersCsv = 'fieldProgressApp/data/voters.csv'
        corruptJson = 'fieldProgressApp/data/test/precincts_sdcc_d6_corrupt'
        gotException = False

        try:
            data = fpm.get_voters_geojson(votersCsv, corruptJson)
        except Exception as e:
            self.assertIsNotNone(e, "Should have received an exception")
            gotException = True

        self.assertTrue(gotException, "Should have received an exception")

    def test_precinct_json_does_not_exist(self):
        votersCsv = 'fieldProgressApp/data/voters.csv'
        nonExistentJson = 'fieldProgressApp/data/test/blahblbahblah'
        gotException = False

        try:
            data = fpm.get_voters_geojson(votersCsv, nonExistentJson)
        except Exception as e:
            self.assertIsNotNone(e, "Should have received an exception")
            gotException = True

        self.assertTrue(gotException, "Should have received an exception")

    def test_precinct_json_none(self):
        votersCsv = 'fieldProgressApp/data/voters.csv'
        noneJson = None
        gotException = False

        try:
            data = fpm.get_voters_geojson(votersCsv, noneJson)
        except Exception as e:
            self.assertIsNotNone(e, "Should have received an exception")
            gotException = True

        self.assertTrue(gotException, "Should have received an exception")
