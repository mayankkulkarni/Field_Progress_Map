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
import axios from 'axios';


const MAPBOX_ACCESS_TOKEN= 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'
const mapStyle="mapbox://styles/mapbox/outdoors-v11"

export const COLOR_TO_RGB_ARRAY=(cluster) =>{

  switch (cluster){
    case 0:
      return [255,0,0]

    case 1:
      return [255,255,0]

    case 2:
      return [0,0,255]

    case 3:
      return [0,128,0]

    case 4:
      return [255,165,0]

    case 5:
      return [238,130,238]

    case 6:
      return [0,128,128]

    case 7:
      return [75,0,130]

    case 8:
      return [250,128,114]

    default:
      return [255,192,203]
  }
}


const initialViewState = {
    // latitude: 49.254,
    // longitude: -123.13,
    latitude: 32.92,   //SAN DIEGO
    longitude: -117.135,
    zoom: 14,
    pitch: 0,
    bearing: 0
};


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
      

      axios.get('http://localhost:8000/api/results/')
          .then( response => {
            this._processData(response.data);
  
          })

    }

    _processData(data) {
      const points = data.features;
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
            <b>Name</b>
          </div>
          <div>{hover.hoveredObject.Name}</div> 
          <div>
            <b>Cluster</b>
          </div>
          <div>
            <div>{hover.hoveredObject.cluster}</div>
          </div>
          <div>
            <b>Voliunteer Assigned</b>
          </div>
          <div>
            <div>{hover.hoveredObject.volunteer}</div>
          </div>
          <div>
            <b>Location</b>
          </div>
          <div>{hover.hoveredObject.Address}</div>
          <div>
            <b>Next Voter On Route</b>
          </div>
          <div>
            <div>{hover.hoveredObject.next_voter}</div>
          </div>
        </div>
      )
    }

    _updateLayerSettings(settings){
      this.setState({settings});
    }


    _renderLayers() {
      const data = this.state.points;
      const settings = this.state.settings
      const turfData = this.props.dataPoints
      let scatterplotObject= {}
      
      if (Object.entries(turfData).length === 0 && turfData.constructor === Object){
        scatterplotObject = {

          id: 'scatterplot',
          getPosition: d => d.geometry.coordinates,
          getColor: d => [0,0,0],
          getRadius: d => 5,
          opacity: 0.9,
          pickable: true,
          radiusMinPixels: 0.25,
          radiusMaxPixels: 30,
          data,
          ...settings
        }
      }
      else{
        scatterplotObject = {
          id: 'scatterplot',
          getPosition: d => d.geometry.coordinates,
          getColor: d => COLOR_TO_RGB_ARRAY(d.properties.cluster),
          getRadius: d => 5,
          opacity: 0.9,
          pickable: true,
          radiusMinPixels: 0.25,
          radiusMaxPixels: 30,
          data: turfData.features,
          onHover: this._onHover,
          ...settings
        }
      }

      return [
        new ScatterplotLayer(scatterplotObject),
        new GeoJsonLayer({
          id: 'geojson-layer',
          data: Precinct,
          opacity: 0.01,
          pickable: false,
          stroked: false,
          filled: true,
          extruded: true,
          lineWidthScale: 200,
          lineWidthMinPixels: 2,
          getFillColor: [79,0,5],   //[160, 160, 180, 200],
          getLineColor: [0, 0, 0, 255],
          getRadius: 100,
          getLineWidth: 10,
          getElevation: 30,
          onHover: this._onHover
        }),
      ];
    }

    render() {
      let left = "0%"
      if(this.props.display === false){
        left = "20%"
      }
      const {hover} = this.state
    
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