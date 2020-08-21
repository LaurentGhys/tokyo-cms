import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { DatabaseNewApp } from '../../../global/abstraction/App.service'
import { Form, FormField } from '../../../global/components/Form'
import { App } from '../../../global/models/App.model'

const formDataKeys = [
  { key: 'id', required: true, placeholder: 'App id' }
]

const NewAppPage = () => {
  const handleFormSubmit = (formData: Object) => {
    let app = new App(formData)
    DatabaseNewApp(app)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  const formFields: FormField[] = [
    { key: 'id', text: 'ID', default: 'vanilla-test-1' },
    { key: 'info.name', text: 'Name', default: 'test' },
    { key: 'info.url', text: 'URL', default: 'http://www.google.com' },
    { key: 'info.urlDescription', text: 'URL Description', default: 'Google.com' },
    { key: 'info.thumbnailUrl', text: 'Thumbnail URL', default: 'https://via.placeholder.com/300' }
  ]
  return (
    <Container>
      <h1>New app</h1>
      <Card>
        <Card.Header as="h4">
          New app
        </Card.Header>
        <Card.Body>
          <Form fields={formFields} onValidSubmit={handleFormSubmit} />
        </Card.Body>
      </Card>
    </Container >
  )
}

export default NewAppPage
