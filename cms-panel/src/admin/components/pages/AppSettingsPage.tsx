import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form as BootstrapForm, Image, Table } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import { DatabaseGetApp, DatabaseUpdateApp } from '../../../global/abstraction/App.service'
import { DatabaseUpdateLabels } from '../../../global/abstraction/Label.service'
import { Languages } from '../../../global/abstraction/Language.service'
import { Form } from '../../../global/components/Form'
import { App } from '../../../global/models/App.model'

const AppSettingsPage = () => {
  const { appId } = useParams()
  const history = useHistory()
  const [app, setApp]: [App, any] = useState(null)
  const [selectedNewLang, setSelectedNewLang] = useState(Languages[0])
  const [newLabelId, setNewLabelId] = useState('')
  const [newLabelName, setNewLabelName] = useState('')
  const [formSubmitTrigger, setFormSubmitTrigger] = useState(false)
  const [updatedLabelNames, setUpdatedLabelName]: [Object, any] = useState({})

  useEffect(() => {
    DatabaseGetApp(appId)
      .then(res => {
        setApp(res.data)
      })
  }, [])

  useEffect(() => {
    console.log(updatedLabelNames)
  }, [updatedLabelNames])

  const updateLabelName = (labelId: string, value: string): void => {
    setUpdatedLabelName({
      ...updatedLabelNames,
      [labelId]: value
    })
  }

  const newLangSubmit = () => {
    const updatedApp = {
      ...app,
      cms: {
        ...app.cms,
        languages: [
          ...app.cms.languages,
          selectedNewLang.code
        ]
      }
    }
    setApp(updatedApp)
  }

  const newLabelSubmit = () => {
    const updatedApp = {
      ...app,
      cms: {
        ...app.cms,
        labelIds: [
          ...app.cms.labelIds,
          newLabelId
        ]
      }
    }
    setNewLabelId('')
    setNewLabelName('')
    setApp(updatedApp)
  }

  const deleteLangSubmit = (langCode: string) => {
    const langs = app.cms.languages.filter(lang => lang !== langCode)
    const updatedApp = {
      ...app,
      cms: {
        ...app.cms,
        languages: langs
      }
    }
    setApp(updatedApp)
  }

  const deleteLabelSubmit = (labelId: string) => {
    const labels = app.cms.labelIds.filter(id => id !== labelId)
    const updatedApp = {
      ...app,
      cms: {
        ...app.cms,
        labelIds: labels
      }
    }
    setApp(updatedApp)
  }

  const deleteAppSubmit = () => {

  }

  const updateAppSubmit = () => {
    setFormSubmitTrigger(true)
  }

  const infoFormSubmit = (formData: Object) => {
    const appCopy = { ...app }
    delete appCopy.info
    let updatedApp = new App({ ...appCopy, ...formData })
    DatabaseUpdateApp(updatedApp)
      .then(() => {
        DatabaseUpdateLabels(app.id, updatedLabelNames)
          .then(() => {
            history.go(0)
          })
      })
  }

  return (
    <div>
      {(app !== null) && (
        <div>
          <Container>
            <h1>Settings</h1>
            <Card>
              <Card.Header>
                <h2>{app.info.name}</h2>
                <Card.Link href={app.info.url}>{app.info.urlDescription}</Card.Link><br />
                <small className="text-muted">{app.id}</small>
              </Card.Header>
              <Card.Body>
                <div>
                  <h3>Info</h3>
                  <Form
                    noButton
                    formSubmitTrigger={formSubmitTrigger}
                    onValidSubmit={infoFormSubmit}
                    fields={
                      [
                        { key: 'info.name', text: 'Name', default: app.info.name },
                        { key: 'info.url', text: 'URL', default: app.info.url },
                        { key: 'info.urlDescription', text: 'URL Description', default: app.info.urlDescription },
                        { key: 'info.thumbnailUrl', text: 'Thumbnail URL', default: app.info.thumbnailUrl }
                      ]
                    }></Form>
                </div>
                <div>
                  <h3>Languages</h3>
                  <Table striped bordered hover >
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {app.cms.languages.map((langCode, index) => (
                        <tr key={index}>
                          <td>{langCode}</td>
                          <td>
                            <Image src={`https://www.countryflags.io/${langCode}/flat/32.png`} roundedCircle />
                            {Languages.filter((lang) => (lang.code === langCode))[0].name}
                          </td>
                          <td><Button variant='danger' size='sm' block
                            onClick={() => deleteLangSubmit(langCode)}>Delete</Button></td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <BootstrapForm.Control as="select" size='sm'
                            onChange={
                              (e) => setSelectedNewLang(Languages.filter((lang) => (lang.code === e.target.value))[0])
                            }>
                            {Languages.map((lang, index) => (<option key={index}>{lang.code}</option>))}
                          </BootstrapForm.Control>
                        </td>
                        <td>
                          <Image src={`https://www.countryflags.io/${selectedNewLang.code}/flat/32.png`} roundedCircle />
                          {selectedNewLang != null && selectedNewLang.name}
                        </td>
                        <td>
                          {!app.cms.languages.includes(selectedNewLang.code) &&
                            <Button variant='primary' size='sm' block onClick={newLangSubmit}>New</Button>
                          }
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div>
                  <h3>Labels</h3>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <td>Name</td>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {app.cms.labelIds.map((labelId, index) => (
                        <tr key={index}>
                          <td>{labelId}</td>
                          <td>
                            <BootstrapForm.Control size='sm' type='text' placeholder='Label name'
                              onChange={(e) => updateLabelName(labelId, e.target.value)}
                              value={updatedLabelNames[labelId]} />
                          </td>
                          <td>
                            <Button variant='danger' size='sm' block
                              onClick={() => deleteLabelSubmit(labelId)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <BootstrapForm.Control size='sm' type='text' placeholder='label-id'
                            onChange={(e) => setNewLabelId(e.target.value)}
                            value={newLabelId} />
                        </td>
                        <td>
                          <BootstrapForm.Control size='sm' type='text' placeholder='Label name'
                            onChange={(e) => setNewLabelName(e.target.value)}
                            value={newLabelName} />
                        </td>
                        <td>
                          {!app.cms.labelIds.includes(newLabelId) && (
                            <Button variant='primary' size='sm' block
                              onClick={newLabelSubmit}>New</Button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button variant='primary' block onClick={updateAppSubmit}>Update app</Button>
                <Button variant='danger' block onClick={deleteAppSubmit}>Delete app</Button>
              </Card.Footer>
            </Card>
          </Container>
        </div>
      )
      }
    </div>
  )
}

export default AppSettingsPage