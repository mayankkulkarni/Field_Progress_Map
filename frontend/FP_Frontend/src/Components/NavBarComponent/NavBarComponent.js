import React from "react";
import {Button, Navbar} from 'react-bootstrap/';


const NavBarComponent = (props) => (

    <Navbar bg="dark" variant="dark">
      <Button variant="light" 
      id="toggle-input-btn"
      style= {{marginRight: "10px"}}
      onClick={props.click}
      >Toggle Input</Button>
    </Navbar>
);

export default NavBarComponent