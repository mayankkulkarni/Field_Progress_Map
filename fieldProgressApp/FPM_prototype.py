#!/usr/bin/env python
# coding: utf-8

# In[91]:


# import pysal.esda.mapclassify as mapclassify
import pandas as pd
import geopandas as gpd
from mapboxgl.utils import *
from mapboxgl.viz import *
from sklearn.cluster import KMeans
import json
from shapely.geometry import Polygon, Point


# In[92]:

volunteers = 7
precinct = '130960'

def create_clusters(dataframe, volunteers):
    kmeans = KMeans(n_clusters=volunteers).fit(dataframe)
    return kmeans

def get_mappings(kmeans):
    return kmeans.labels_

def main():
    df = pd.read_csv('fieldProgressApp/data/voters.csv')
    df.columns = ['Name', 'Address', 'lat', 'lon', 'zipcode']
    pdf = gpd.read_file('fieldProgressApp/data/precincts_sdcc_d6.json')
    vdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat))

    pvdf = vdf[pdf.loc[pdf['code'] == precinct]['geometry'].apply(lambda x: vdf['geometry'].within(x)).any()]
    kmeans = create_clusters(pvdf[['lat','lon']], volunteers)
    pvdf['cluster'] = get_mappings(kmeans)

    mapbox_token = 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'

    df_to_geojson(pvdf, filename='points1.geojson', 
                        properties = ['Name','Address','zipcode','cluster'],
                         lat='lat', lon='lon', precision=10)
    return



# In[104]:


# color_breaks = mapclassify.Natural_Breaks(pvdf['cluster'], k=volunteers, initial=0).bins
# color_stops = create_color_stops(color_breaks, colors='YlGnBu')

# # Create the viz from the dataframe
# viz = CircleViz('points1.geojson',
#                 access_token=mapbox_token, 
#                 height='1000px',
#                 color_property = "",
#                 color_stops = color_stops,
#                 center = (-117.176, 32.8560),
#                 zoom = 10,
#                 below_layer = 'waterway-label')

# viz.show()


# # In[106]:


# viz = CircleViz('points1.geojson',
#                 access_token=mapbox_token, 
#                 height='1000px',
#                 color_property = "cluster",
#                 color_stops = color_stops,
#                 center = (-117.176, 32.8560),
#                 zoom = 11,
#                 below_layer = 'waterway-label')

# viz.show()


# In[ ]:




