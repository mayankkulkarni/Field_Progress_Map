import React from "react";
import {Form, Card} from 'react-bootstrap/';

class VoterInputForms extends React.Component {

    render() {
        return (
            <>
                <Card style={{ width: '12rem', marginBottom: '20px' }}>
                    <Card.Body>
                        <Form>
                            <div>
                                <Form.Label>Volunteer Name</Form.Label>
                                <Form.Control type="text" 
                                onChange= {this.props.nameChange}
                                value={this.props.name}/>
                            </div>
                            <div>
                                <Form.Label>Availability</Form.Label>
                                <Form.Control type="text" 
                                onChange= {this.props.availabilityChange}
                                value={this.props.availability}/>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>

            </>
            
        )
    }
}

export default VoterInputForms;