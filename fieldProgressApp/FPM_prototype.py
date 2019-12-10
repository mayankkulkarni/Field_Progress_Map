import pandas as pd
import geopandas as gpd
from mapboxgl.utils import *
from mapboxgl.viz import *
from sklearn.cluster import KMeans
import json
from shapely.geometry import Polygon, Point


def get_voters_geojson(votersCsv, precinctJson):
    """Creates a GeoJSON file containing voter and precinct information.

    :param votersCsv: a CSV file containing all voters
    :param precinctJson: a JSON file containing precinct information
    :returns: None, but a new GeoJSON file should be created

    """

    df = pd.read_csv(votersCsv)
    df.columns = ['Name', 'Address', 'lat', 'lon', 'zipcode']
    pdf = gpd.read_file(precinctJson)
    vdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat))
    mapbox_token = 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'

    df_to_geojson(vdf, filename='all_voters.geojson', 
                        properties = ['Name','Address','zipcode'],
                         lat='lat', lon='lon', precision=10)
    return
