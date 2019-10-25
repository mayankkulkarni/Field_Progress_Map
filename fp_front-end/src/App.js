import React from 'react';
import logo from './logo.svg';
import './App.css';
import mapboxgl from "mapbox-gl";
import ReactMapGL from "react-map-gl";
import 'bootstrap/dist/css/bootstrap.min.css';


import Map from "./Components/Map/Map"
import SidePane from './Components/SidePane/SidePane';
import NavBarComponent from './Components/NavBarComponent/NavBarComponent';

class App extends React.Component {

  render(){

    return (
      <div>
        <NavBarComponent />
        <div style= {{display: "inline"}}>
          <Map />          
          <div style= {{zIndex: "-1"}}>
            <SidePane />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
