import React from "react";
import {Button, Navbar, Form} from 'react-bootstrap/';
import Precinct from '../../precinct.json';

const PrecinctData= [...Precinct.features]
console.log(PrecinctData)

class NavBarComponent extends React.Component {

  state= {
    PrecinctIDs: []
  }

  componentDidMount= () => {
    this.getPrecinctIDs(PrecinctData);
  }

  getPrecinctIDs= (data) => {

    const IDs = data.map( object => object.properties.code)
    console.log(IDs);
    this.setState({PrecinctIDs: IDs})
  }

  render() {

    return (

        <Navbar bg="dark" variant="dark">
          <Button variant="light" 
          style= {{marginRight: "10px"}}
          onClick={this.props.click}
          >Toggle Input</Button>
          <Form.Group controlId="formGridState" style= {{marginBottom: "0px", marginLeft: "500px"}}>
            <Form.Control as="select" placeholder="State">
              <option>Select Precinct...</option>
              {
                this.state.PrecinctIDs.map((id, index) => {
                  return <option key={index}>{id}</option>
                })
              }
            </Form.Control>
          </Form.Group>
        </Navbar>
    );
  }
}
export default NavBarComponent