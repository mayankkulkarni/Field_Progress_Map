import React from 'react';
import logo from './logo.svg';
import './App.css';
import mapboxgl from "mapbox-gl";
import ReactMapGL from "react-map-gl";

class App extends React.Component {

  state = {
    viewport: {
      width:"100vw",
      height: "100vh",
      latitude: 42.430472,
      longitude: -123.334102,
      zoom: 16
    }
  }

  render(){

    return (
      <ReactMapGL 
      {...this.state.viewport} mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onViewportChange={(viewport => this.setState({viewport}))}
      mapboxApiAccessToken = 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'>
      </ReactMapGL>
    );
  }
}

export default App;
