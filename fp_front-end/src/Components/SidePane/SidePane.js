import React from "react";
import "./SidePane.css";
import VoterInputForms from "../Form/VoterInputForms";
import {Button, Form, Card} from 'react-bootstrap/';



const SidePane=  () => (

    <div className="Pane"> 
        <div className="Form-Container">
          <VoterInputForms />
        </div>
        <Button className="Run-Button2" variant="light">Add Volunteer</Button>
        <Button className="Run-Button" variant="light">Cut Turf</Button>
    </div>
);


export default SidePane; 