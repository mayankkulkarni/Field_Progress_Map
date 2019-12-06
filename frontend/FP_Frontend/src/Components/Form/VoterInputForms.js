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
                                placeholder="John Doe"
                                onChange= {this.props.nameChange}
                                value={this.props.name}
                                placeholder="John Doe" />
                            </div>
                            <div>
                                <Form.Label>Availability</Form.Label>
                                <Form.Control type="text" 
                                placeholder="2h"
                                onChange= {this.props.availabilityChange}
                                value={this.props.availability}
                                placeholder="3h" />
                            </div>
                        </Form>
                    </Card.Body>
                </Card>

            </>
            
        )
    }
}

export default VoterInputForms;