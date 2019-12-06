import React from 'react';
import "./SidePane.css";
import VoterInputForms from "../Form/VoterInputForms";
import {Button} from 'react-bootstrap/';
import axios from 'axios';

class SidePane extends React.Component {

  state = {
    volunteers: [
      {volunteerName: '', availability: ''}
    ]
  }

  // pass data up to parent component
  componentDidUpdate() {}

  addVolunteerHandler= () => {
    let volunteers = [...this.state.volunteers]
    const newVolunteer = {volunteerName: '', availability: ''}
    volunteers.push(newVolunteer)
    this.setState({volunteers: volunteers})
  }

  nameChangeHandler= (event, id) => {
    var newName = event.target.value;
    let volunteers = [...this.state.volunteers]

    if (newName != null && newName != '') {
      var re = /([a-zA-Z ]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*)/;
      var matches = newName.match(re);

      if (matches != null && matches.length > 0) {
        volunteers[id].volunteerName=matches[0];
        event.target.value = matches[0];
      } else {
        volunteers[id].volunteerName = '';
        event.target.value = '';
      }
    } else {
      event.target.value = '';
      volunteers[id].volunteerName = '';
    }

    this.setState({volunteers: volunteers});
  }

  availabilityChangeHandler= (event, id) => {
    var newAvail = event.target.value;
    let volunteers = [...this.state.volunteers];

    if (newAvail != null && newAvail != '') {
      var re = /[0-9]+[hms]?/;
      var matches = newAvail.match(re);

      if (matches != null && matches.length > 0) {
        newAvail = matches[0];
      } else {
        newAvail = '';
      }
    } else {
      newAvail = '';
    }

    event.target.value = newAvail;
    volunteers[id].availability = newAvail;
    this.setState({volunteers: volunteers})
  }

  sendData = () => {
    const volunteers = this.state.volunteers
    
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

    axios.get('http://localhost:8000/home/').then( response => {
      console.log(response);
    });
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
      <div id="input-pane" className="Pane"> 
        <div className="Form-Container">
          {forms}
        </div>
        <Button
          variant="light"
         className="Run-Button2"  
         id="add-volunteer-button-id"
         onClick={this.addVolunteerHandler}
         >
           Add Volunteer
          </Button>
        <Button className="Run-Button" 
        variant="light"
        id="cut-turf-button-id"
        onClick={this.sendData}>
          Cut Turf
        </Button>
      </div>
    )
  }
}


export default SidePane; 