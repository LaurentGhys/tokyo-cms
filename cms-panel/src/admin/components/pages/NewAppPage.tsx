import React from 'react'
import { Card, Container, Form } from 'react-bootstrap'

const NewAppPage = () => {
  return (
    <Container>
      <h1>New app</h1>
      <Card>
        <Card.Header as="h4">
          New app
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>

            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default NewAppPage

