import React from "react";
import {Button, Form, Card} from 'react-bootstrap/';

class VoterInputForms extends React.Component {

    render() {
        return (
            <>
                <Card style={{ width: '12rem', marginBottom: '20px' }}>
                    <Card.Body>
                        <Form>
                            <div>
                                <Form.Label>Volunteer Name</Form.Label>
                                <Form.Control type="text" placeholder="John Doe" />
                            </div>
                            <div>
                                <Form.Label>Availability</Form.Label>
                                <Form.Control type="text" placeholder="2hrs" />
                            </div>
                        </Form>
                    </Card.Body>
                </Card>

                <Card style={{ width: '12rem' }}>
                    <Card.Body>
                        <Form>
                            <div>
                                <Form.Label>Volunteer Name</Form.Label>
                                <Form.Control type="text" placeholder="Jane Doe" />
                            </div>
                            <div>
                                <Form.Label>Availability</Form.Label>
                                <Form.Control type="text" placeholder="4hrs" />
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </>
            
        )
    }
}

export default VoterInputForms;