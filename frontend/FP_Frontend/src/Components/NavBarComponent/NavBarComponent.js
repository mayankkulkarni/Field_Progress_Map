import React from "react";
import {Button, Navbar, Form} from 'react-bootstrap/';
import ReactDOM from 'react-dom';
import Precinct from '../../precinct.json';

const PrecinctData= [...Precinct.features]
console.log(PrecinctData)

class NavBarComponent extends React.Component {

  state= {
    PrecinctIDs: [],
    SelectedID: ""
  }

  componentDidMount= () => {
    this.getPrecinctIDs(PrecinctData);
  }

  getPrecinctIDs= (data) => {

    const IDs = data.map( object => object.properties.code)
    this.setState({PrecinctIDs: IDs})
  }

  handleIDChange= (event) => {
    const ID = event.target.value
    this.setState({SelectedID: ID});
    this.props.getID(ID)
  }

  render() {

    return (

        <Navbar bg="dark" variant="dark">
          <Button variant="light" 
          style= {{marginRight: "10px"}}
          id="toggle-input-btn" 
          onClick={this.props.click}
          >Toggle Input</Button>
          <Form.Group controlId="formGridState" style= {{marginBottom: "0px", marginLeft: "500px"}}>
            <Form.Control
             as="select"
             ref="precintID"
             required
             onChange={this.handleIDChange}>
               <option value="">Select Precinct</option>
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