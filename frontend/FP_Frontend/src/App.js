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
    showPane: false,
    clusterResult: {},
    precinctID: ''
  }
  

  menuHandler= () => {
    let paneBoolean = this.state.showPane
    this.setState({showPane: !paneBoolean})
  }

  getTurfCutResult = (algorithmResult) => {
    this.setState({clusterResult: algorithmResult})
  }

  retrievePrecintID = (ID) => {
    this.setState({precinctID:ID})
  }


  render(){
    let pane = null
    
    return (  
      <div>
        <div>
          <NavBarComponent 
          click= {this.menuHandler}
          getID= {this.retrievePrecintID}/>
        </div>
        <div>
          <SidePane 
          turfResult={this.getTurfCutResult}
          precinctInfo= {this.state.precinctID}
          />
        </div>
        <div>
          <Map 
          display={this.state.showPane}
          dataPoints= {this.state.clusterResult}
          />          
        </div>
      </div>
    );
  }
}

export default App;
