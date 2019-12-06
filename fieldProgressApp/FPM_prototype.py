import pandas as pd
import geopandas as gpd
from mapboxgl.utils import *
from mapboxgl.viz import *
from sklearn.cluster import KMeans
import json
from shapely.geometry import Polygon, Point


def get_voters_geojson():
    df = pd.read_csv('fieldProgressApp/data/voters.csv')
    df.columns = ['Name', 'Address', 'lat', 'lon', 'zipcode']
    pdf = gpd.read_file('fieldProgressApp/data/precincts_sdcc_d6.json')
    vdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat))
    mapbox_token = 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'

    df_to_geojson(vdf, filename='all_voters.geojson', 
                        properties = ['Name','Address','zipcode'],
                         lat='lat', lon='lon', precision=10)
    return
