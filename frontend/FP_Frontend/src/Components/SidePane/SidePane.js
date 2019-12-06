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
    axios.get('http://localhost:8000/home/')
          .then( response => {
            console.log(response);
          })
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