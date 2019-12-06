import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer, GeoJsonLayer, ScatterplotLayer, PolygonLayer} from '@deck.gl/layers';
import {StaticMap} from "react-map-gl";
import ReactMapGL from "react-map-gl";
import {MapView, View} from '@deck.gl/core';
import {scaleThreshold} from 'd3-scale';     // github example
import "./Map.css"
import { LayerControls, SCATTERPLOT_CONTROLS } from './controls';
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

// end of info 

const initialViewState = {
    // latitude: 49.254,
    // longitude: -123.13,
    latitude: 32.92,   //SAN DIEGO
    longitude: -117.135,
    zoom: 14,
    pitch: 0,
    bearing: 0
};


// console.log(precinctData)

const geoJsonData = {"type": "FeatureCollection", "features": [
  {"geometry": {"type": "Point", "coordinates": [-117.131861, 32.920173]}, "type": "Feature", "properties": {"cluster": 3, "Address": "8990 BRENTFORD AVE", "Name": "Lavinnia  Sweigart", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.133607, 32.920137]}, "type": "Feature", "properties": {"cluster": 4, "Address": "8880 BRENTFORD AVE", "Name": "Mercedese Irmgard Thero", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.132555, 32.920159]}, "type": "Feature", "properties": {"cluster": 1, "Address": "8950 BRENTFORD AVE", "Name": "Denkevitz  Rener", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.132507, 32.920452]}, "type": "Feature", "properties": {"cluster": 1, "Address": "8969 LIBRA DR", "Name": "Assent  Gantvoort", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.132834, 32.920445]}, "type": "Feature", "properties": {"cluster": 1, "Address": "8953 LIBRA DR", "Name": "Keuna  Malmgren", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.13517, 32.920105]}, "type": "Feature", "properties": {"cluster": 0, "Address": "8776 BRENTFORD AVE", "Name": "Jimyah  Wokwicz", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.133653, 32.920426]}, "type": "Feature", "properties": {"cluster": 4, "Address": "8921 LIBRA DR", "Name": "Cannette  Mahalick", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.134128, 32.920126]}, "type": "Feature", "properties": {"cluster": 2, "Address": "8850 BRENTFORD AVE", "Name": "Liliya  Rallison", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.13267, 32.920449]}, "type": "Feature", "properties": {"cluster": 1, "Address": "8961 LIBRA DR", "Name": "Fugate  Standerwick", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.133607, 32.920137]}, "type": "Feature", "properties": {"cluster": 4, "Address": "8880 BRENTFORD AVE", "Name": "Yeicob  Domingues", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.135138, 32.920393]}, "type": "Feature", "properties": {"cluster": 0, "Address": "8777 LIBRA DR", "Name": "Nayya  Drouillard", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.134475, 32.920407]}, "type": "Feature", "properties": {"cluster": 5, "Address": "8845 LIBRA DR", "Name": "Tammeka  Piazza", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.133953, 32.920131]}, "type": "Feature", "properties": {"cluster": 2, "Address": "8860 BRENTFORD AVE", "Name": "Quintoria  Reigle", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.135002, 32.920108]}, "type": "Feature", "properties": {"cluster": 0, "Address": "8786 BRENTFORD AVE", "Name": "D\u017eemila  Denny", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.13267, 32.920449]}, "type": "Feature", "properties": {"cluster": 1, "Address": "8961 LIBRA DR", "Name": "Erlon  Willison", "zipcode": 130960}}
  ,{"geometry": {"type": "Point", "coordinates": [-117.133256, 32.920144]}, "type": "Feature", "properties": {"cluster": 6, "Address": "8910 BRENTFORD AVE", "Name": "Vedvit  Swerdlow", "zipcode": 130960}}
  ]}

const tooltipStyle = {
  position: 'absolute',
  padding: '4px',
  background: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  maxWidth: '300px',
  fontSize: '10px',
  zIndex: 9,
  pointerEvents: 'none'
};


class Map extends React.Component {

    state = {
      hover: {
        x:0,
        y:0,
        hoveredObject: null
      },
      settings: Object.keys(SCATTERPLOT_CONTROLS).reduce(
        (accu, key) => ({
          ...accu,
          [key]: SCATTERPLOT_CONTROLS[key].value
        }),
        {}
      ),
      points: [],
    }

    componentDidMount() {
      this._processData();
    }

    _processData() {
      const points = geoJsonData.features;
      console.log(points);
      this.setState({points})
    }

    _onHover = ({ x, y, object }) => {
      const properties = object ? object.properties : null;
      
      if(object){
        this.setState({
          hover: { 
           x: object.geometry.coordinates[0],
           y: object.geometry.coordinates[1],
           hoveredObject: properties
          } 
       });
      }
      
    }

    _renderTooltip(left) {
      const {hover} = this.state
      return hover.hoveredObject && (
        <div style={{position: 'absolute',
         zIndex: 1, 
         pointerEvents: 'none',
         padding: '8px',
         background: 'rgba(0, 0, 0, 0.8)',
         color: '#fff', 
         fontSize: '15px',
         left: left, top: "7.3%"}}>
          <div>
              <b>Cluster</b>
              </div>
              <div>
                <div>{hover.hoveredObject.cluster}</div>
              </div>
              <div>
                <b>Name</b>
              </div>
              <div>{hover.hoveredObject.Name}</div>
              <div>
                <b>Location</b>
              </div>
              <div>{hover.hoveredObject.Address}</div>
        </div>
      );
    }

    _updateLayerSettings(settings){
      this.setState({settings});
    }


    _renderLayers() {
      const data = this.state.points;
      const settings = this.state.settings
      

      return [
        // only needed when using shadows - a plane for shadows to drop on
        // new PolygonLayer({
        //   id: 'polygon-layer',
        //   precinctCoord,
        //   pickable: true,
        //   stroked: true,
        //   filled: true,
        //   wireframe: true,
        //   lineWidthMinPixels: 1,
        //   getPolygon: d => d,
        //   getLineColor: [80, 80, 80],
        //   getFillColor: [80, 80, 80],
        //   getLineWidth: 250,
        // }),
        new ScatterplotLayer({
          id: 'scatterplot',
          getPosition: d => d.geometry.coordinates,
          getColor: d => COLOR_SCALE(d.properties.cluster),
          getRadius: d => 5,
          opacity: 0.9,
          pickable: true,
          radiusMinPixels: 0.25,
          radiusMaxPixels: 30,
          data,
          onHover: this._onHover,
          ...settings
        }),
        new GeoJsonLayer({
          id: 'geojson-layer',
          data: Precinct,
          opacity: 0.1,
          pickable: false,
          stroked: false,
          filled: true,
          extruded: true,
          lineWidthScale: 200,
          lineWidthMinPixels: 2,
          getFillColor: [160, 160, 180, 200],
          getLineColor: [127, 205, 187],
          getRadius: 100,
          getLineWidth: 100,
          getElevation: 30,
          // onHover: this._onHover
        }),
      ];
    }

    render() {
      let left = "0%"
      if(this.props.display === false){
        left = "20%"
      }
      const {hover} = this.state
      console.log(hover)
      console.log(hover.hoveredObject);
    
        return (   
          <>
            <LayerControls
            settings={this.state.settings}
            propTypes={SCATTERPLOT_CONTROLS}
            onChange={settings => this._updateLayerSettings(settings)}
            />
            <DeckGL
            layers={this._renderLayers()}
            initialViewState={initialViewState}
            style={{top:"7.3%", left:left}}
            views={ new MapView({
                height: '100%',
                width: '100%',
                clear: true,
                controller: true
            })}
            >
              <StaticMap
              style={{top:"7.3%", left:left}}
              reuseMaps
              mapStyle={mapStyle}
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              />
              { this._renderTooltip(left) }
            </DeckGL>
          </>

          );
    }
}

export default Map;