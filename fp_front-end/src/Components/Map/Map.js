import React from 'react';
import DeckGL from '@deck.gl/react';
import {render} from 'react-dom';
import {LineLayer, GeoJsonLayer, ScatterplotLayer, PolygonLayer} from '@deck.gl/layers';
import {StaticMap} from "react-map-gl";
import ReactMapGL from "react-map-gl";
import {View, FirstPersonView, MapView, WebMercatorViewport} from '@deck.gl/core';
import {scaleThreshold} from 'd3-scale';     // github example
import Precinct from '../../precinct.json'

const MAPBOX_ACCESS_TOKEN= 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'
const mapStyle="mapbox://styles/mapbox/outdoors-v11"

// Information from the github deckGL geoGSON example 
const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'; // eslint-disable-line

export const COLOR_SCALE = scaleThreshold()
  .domain([-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
  ]);

const landCover = [[[-123.0, 49.196], [-123.0, 49.324], [-123.306, 49.324], [-123.306, 49.196]]];


// end of info 

const initialViewState = {
    width:"80vw",
    height: "80vh",
    latitude: 49.254,
    longitude: -123.13,
    // latitude: 32.92,   SAN DIEGO
    // longitude: -117.135,
    zoom: 11.5,
    pitch: 0,
    bearing: 0
};

const precinctData = Precinct;

const linePlotData = [{sourcePosition: [-117.132, 32.92], targetPosition: [-117.132, 32.95]}];

const geoJsonData2 = {"type": "FeatureCollection", "features": [
    {"geometry": {"type": "Point", "coordinates": [-117.132, 32.92]}, "type": "Feature", "properties": {"cluster": 3, "Address": "8990 BRENTFORD AVE", "Name": "Lavinnia  Sweigart", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.134, 32.92]}, "type": "Feature", "properties": {"cluster": 4, "Address": "8880 BRENTFORD AVE", "Name": "Mercedese Irmgard Thero", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.133, 32.92]}, "type": "Feature", "properties": {"cluster": 0, "Address": "8950 BRENTFORD AVE", "Name": "Denkevitz  Rener", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.133, 32.92]}, "type": "Feature", "properties": {"cluster": 0, "Address": "8969 LIBRA DR", "Name": "Assent  Gantvoort", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.133, 32.92]}, "type": "Feature", "properties": {"cluster": 0, "Address": "8953 LIBRA DR", "Name": "Keuna  Malmgren", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.135, 32.92]}, "type": "Feature", "properties": {"cluster": 1, "Address": "8776 BRENTFORD AVE", "Name": "Jimyah  Wokwicz", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.134, 32.92]}, "type": "Feature", "properties": {"cluster": 4, "Address": "8921 LIBRA DR", "Name": "Cannette  Mahalick", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.134, 32.92]}, "type": "Feature", "properties": {"cluster": 2, "Address": "8850 BRENTFORD AVE", "Name": "Liliya  Rallison", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.133, 32.92]}, "type": "Feature", "properties": {"cluster": 0, "Address": "8961 LIBRA DR", "Name": "Fugate  Standerwick", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.134, 32.92]}, "type": "Feature", "properties": {"cluster": 4, "Address": "8880 BRENTFORD AVE", "Name": "Yeicob  Domingues", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.135, 32.92]}, "type": "Feature", "properties": {"cluster": 1, "Address": "8777 LIBRA DR", "Name": "Nayya  Drouillard", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.134, 32.92]}, "type": "Feature", "properties": {"cluster": 5, "Address": "8845 LIBRA DR", "Name": "Tammeka  Piazza", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.134, 32.92]}, "type": "Feature", "properties": {"cluster": 2, "Address": "8860 BRENTFORD AVE", "Name": "Quintoria  Reigle", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.135, 32.92]}, "type": "Feature", "properties": {"cluster": 1, "Address": "8786 BRENTFORD AVE", "Name": "D\u017eemila  Denny", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.133, 32.92]}, "type": "Feature", "properties": {"cluster": 0, "Address": "8961 LIBRA DR", "Name": "Erlon  Willison", "zipcode": 130960}}
    ,{"geometry": {"type": "Point", "coordinates": [-117.133, 32.92]}, "type": "Feature", "properties": {"cluster": 6, "Address": "8910 BRENTFORD AVE", "Name": "Vedvit  Swerdlow", "zipcode": 130960}}
]}
const scattrPlotData= {coordinates: [-117.132, 32.92], radius: 10000, "Address": "8990 BRENTFORD AVE", "Name": "Lavinnia  Sweigart"}


class Map extends React.Component {


    state = {
        viewport: {
            width:"80vw",
            height: "80vh",
            // latitude: 32.92,        SAN DIEGO
            // longitude: -117.135,
            latitude: 49.254,
            longitude: -123.13,
            zoom: 12
        },
    }

    _renderLayers() {
        const {data = DATA_URL} = this.props;
    
        return [
          // only needed when using shadows - a plane for shadows to drop on
          new PolygonLayer({
            id: 'ground',
            data: landCover,
            stroked: false,
            getPolygon: f => f,
            getFillColor: [0, 0, 0, 0]
          }),
          new GeoJsonLayer({
            id: 'geojson',
            data,
            opacity: 0.8,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
            getFillColor: f => COLOR_SCALE(f.properties.growth),
            getLineColor: [255, 255, 255],
            pickable: true,
            onHover: this._onHover
          })
        ];
      }

    render() {
        const layer1 = [
            new LineLayer({id: 'line-layer', linePlotData })
        ];

        const layer2 = [new GeoJsonLayer({
            id: 'geojson',
            precinctData,
            opacity: 0.8,
            pickable: true,
            stroked: false,
            filled: true,
            extruded: true,
            // lineWidthScale: 20,
            // lineWidthMinPixels: 2,
            getFillColor: [160, 160, 180, 200],
            getLineColor: [255, 255, 255],
            // getRadius: 1000,
            // getLineWidth: 1,
            // getElevation: 30,
            onHover: ({object, x, y}) => {
              const tooltip = object.properties.name || object.properties.station;
            }
        })]

        const layer3 = new ScatterplotLayer({
            id: 'scatterplot-layer',
            scattrPlotData,
            pickable: true,
            opacity: 0.9,
            stroked: true,
            filled: true,
            radiusScale: 6,
            radiusMinPixels: 1,
            radiusMaxPixels: 100,
            lineWidthMinPixels: 1,
            getPosition: d => d.coordinates,
            getRadius: d => d.radius,
            getFillColor: d => [255, 140, 0],
            getLineColor: d => [0, 0, 0],
            onHover: ({object, x, y}) => {
              const tooltip = `${object.name}\n${object.address}`;
            }
        })


        return (
           
            // <DeckGL
            // initialViewState={initialViewState}
            // controller={true}
            // layers={[layer2]}
            // views={ new MapView({
            //     x: '20%',
            //     y: '7.3%',
            //     height: '100%',
            //     width: '80%',
            //     clear: true,
            //     controller: true
            // })}
            // >
            //     <ReactMapGL 
            //         {...this.state.viewport} 
            //         mapStyle="mapbox://styles/mapbox/outdoors-v11"
            //         onViewportChange={(viewport => this.setState({viewport}))}
            //         mapboxApiAccessToken = {MAPBOX_ACCESS_TOKEN} >
            //     </ReactMapGL>
            // </DeckGL>

            <DeckGL
            layers={this._renderLayers()}
            effects={this._effects}
            initialViewState={initialViewState}
            views={ new MapView({
                x: '20%',
                y: '7.3%',
                height: '100%',
                width: '80%',
                clear: true,
                controller: true
            })}
            >
                <StaticMap
                reuseMaps
                mapStyle={mapStyle}
                preventStyleDiffing={true}
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                />

            {this._renderTooltip}
            </DeckGL>
          );
    }
}

export default Map;