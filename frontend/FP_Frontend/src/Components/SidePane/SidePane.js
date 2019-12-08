import React from 'react';
import "./SidePane.css";
import VoterInputForms from "../Form/VoterInputForms";
import {Button} from 'react-bootstrap/';
import axios from 'axios';



class SidePane extends React.Component {

  state= {
    volunteers: [
      {volunteerName: '', availability: ''}
    ]
  }

  // pass data up to parent component
  componentDidUpdate() {

  }

  addVolunteerHandler= () => {

    let volunteers = [...this.state.volunteers]
    const newVolunteer = {volunteerName: '', availability: ''}
    volunteers.push(newVolunteer)
    this.setState({volunteers: volunteers})
  }

  nameChangeHandler= (event, id) => {
    let volunteers = [...this.state.volunteers]
    volunteers[id].volunteerName= event.target.value
    this.setState({volunteers: volunteers})
  }

  availabilityChangeHandler= (event, id) => {
    let volunteers = [...this.state.volunteers]
    volunteers[id].availability= event.target.value
    this.setState({volunteers: volunteers})

  }

  sendData= () => {
    const volunteers = this.state.volunteers
    const precinctID = this.props.precinctInfo
    const requestData= {
      precinctID: precinctID,
      volunteers: volunteers,
    }

    // Make sure all cards are filled in
    for (var it = 0; it < volunteers.length; it++) {
      if (volunteers[it].volunteerName == '') {
        window.alert('Please ensure all cards have valid volunteer names.')
        return
      }
      if (volunteers[it].availability == '') {
        window.alert('Please ensure all cards have valid volunteer availabilities.')
        return
      }
    }

    //this will be axios.post
    axios.post('http://localhost:8000/api/clusters/', requestData)
          .then( response => {
            this.props.turfResult(response.data)
            // console.log(response);
          })

    this.setState({volunteers: [
      {volunteerName: '', availability: ''}
    ]})
  }

  render(){

    const forms = this.state.volunteers.map( (volunteer, index) => {
      return <VoterInputForms
       name={volunteer.volunteerName}
       availability= {volunteer.availability}
       key={index}
       nameChange= {(event)=> this.nameChangeHandler(event, index)}
       availabilityChange= {(event) => this.availabilityChangeHandler(event, index)}
       />
    })

    return (
      <div className="Pane"> 
        <div className="Form-Container">
          {forms}
        </div>
        <Button
          variant="light"
         className="Run-Button2"  
         onClick={this.addVolunteerHandler}
         >
           Add Volunteer
          </Button>
        <Button className="Run-Button" 
        variant="light"
        onClick={this.sendData}>
          Cut Turf
        </Button>
      </div>
    )
  }
}


export default SidePane; 