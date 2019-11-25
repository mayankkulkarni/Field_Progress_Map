import React from 'react';
import './App.css';
// import mapboxgl from "mapbox-gl";
// import ReactMapGL from "react-map-gl";
import 'bootstrap/dist/css/bootstrap.min.css';


import Map from "./Components/Map/Map"
import SidePane from './Components/SidePane/SidePane';
import NavBarComponent from './Components/NavBarComponent/NavBarComponent';

class App extends React.Component {

  state={
    showPane: false
  }
  

  menuHandler= () => {
    let paneBoolean = this.state.showPane
    this.setState({showPane: !paneBoolean})
  }

  render(){
    let pane = null
    
    

    return (  
      <div>
        <div>
          <NavBarComponent click= {this.menuHandler}/>
        </div>
        <div>
          <SidePane />
        </div>
        <div className="Map-Canvas">
          <Map display={this.state.showPane}/>          
        </div>
      </div>
    );
  }
}

export default App;
