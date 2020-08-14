import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Auth = () => {
    const [validated, setValidated] = useState(false)
    const history = useHistory()

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            history.push('/dashboard')
        }
        setValidated(true)
    }

    return (
        <div>
            <Container>
                <Card>
                    <Card.Header as='h4'>
                        Login
                    </Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Auth