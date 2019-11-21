#!/usr/bin/env python
# coding: utf-8

# In[91]:


import pysal.esda.mapclassify as mapclassify
import pandas as pd
import geopandas as gpd
from mapboxgl.utils import *
from mapboxgl.viz import *
from sklearn.cluster import KMeans
import json
from shapely.geometry import Polygon, Point
import webbrowser
import sys


# In[92]:

voter_data = sys.argv[1]
volunteers = int(sys.argv[2])
precinct_input = sys.argv[3]

def create_clusters(dataframe, volunteers):
    kmeans = KMeans(n_clusters=volunteers).fit(dataframe)
    return kmeans

def get_mappings(kmeans):
    return kmeans.labels_

def get_cluster_per_precint(precinct, vdf, pdf, volunteers):
    pvdf = vdf[pdf.loc[pdf['code'] == precinct]['geometry'].apply(lambda x: vdf['geometry'].within(x)).any()]
    if len(pvdf) != 0:
        if len(pvdf) < volunteers:
            volunteers = len(pvdf)
        kmeans = create_clusters(pvdf[['lat','lon']], volunteers)
        pvdf['cluster'] = get_mappings(kmeans)
        return pvdf
    else:
        return None

def get_precinct_viz(precinct, precinct_cluster_dict, volunteers):
    if len(precinct_cluster_dict[precinct]) == 0:
        return
    mapbox_token = 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'
    data = df_to_geojson(precinct_cluster_dict[precinct], filename=None, 
                    properties = ['Name','Address','zipcode','cluster'],
                     lat='lat', lon='lon', precision=10)
    if len(precinct_cluster_dict[precinct]) < volunteers:
            volunteers = len(precinct_cluster_dict[precinct])
    color_breaks = mapclassify.Natural_Breaks(precinct_cluster_dict[precinct]['cluster'], k=volunteers, initial=0).bins
    color_stops = create_color_stops(color_breaks, colors='YlGnBu')
    
    center = (-117.176, 32.8560)
    center_xy = precinct_cluster_dict[precinct].iloc[0]['geometry']
    center_x = center_xy.x
    center_y = center_xy.y
    center = (center_x, center_y)
    # Create the viz from the dataframe
    viz = CircleViz(data, access_token=mapbox_token, height='1000px', color_property = "", color_stops = color_stops, center = center, zoom = 15, below_layer = 'waterway-label')
    with open("initial_map.html", "w") as handler:
    	handler.write(viz.create_html())
    handler.close()
    filename = 'file:///Users/akankshadiwedy/Downloads/Field_Progress_Map-data_preprocessing/' + 'initial_map.html'
    webbrowser.open_new_tab(filename)
    viz = CircleViz(data, access_token=mapbox_token, height='1000px', color_property = "cluster", color_stops = color_stops, center = center, zoom = 15, below_layer = 'waterway-label')
    with open("result_map.html", "w") as handler:
    	handler.write(viz.create_html())
    handler.close()
    filename = 'file:///Users/akankshadiwedy/Downloads/Field_Progress_Map-data_preprocessing/' + 'result_map.html'
    webbrowser.open_new_tab(filename)


df = pd.read_csv(voter_data)
df.columns = ['Name', 'Address', 'lat', 'lon', 'zipcode']
pdf = gpd.read_file('data/precincts_sdcc_d6.json')
vdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat))

precinct_code_list = list(pdf['code'])

precinct_cluster_dict = {}
for precinct in  precinct_code_list:
    precinct_cluster_dict[precinct] = get_cluster_per_precint(precinct, vdf, pdf, volunteers)

get_precinct_viz(precinct_input, precinct_cluster_dict, volunteers)



