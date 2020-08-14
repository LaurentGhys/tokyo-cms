import React, { useState } from 'react'
import { Accordion, Badge, Button, Card, Col, Container, Form, Nav, Row, Tab } from 'react-bootstrap'

const EditorPage = () => {
    const [labels, setLabels] = useState({
        header1: {
            id: 'header1',
            title: 'Header 1',
            en: 'This is the first header',
            nl: 'Dit is de eerste header',
            fr: 'french',
            de: 'german'
        },
        header2: {
            id: 'header2',
            title: 'Header 1',
            en: 'This is the first header',
            nl: 'Dit is de eerste header',
            fr: 'Ceci est le premier header'
        },
        header3: {
            id: 'header3',
            title: 'Header 1',
            en: 'This is the first header',
            nl: 'Dit is de eerste header',
            fr: 'Ceci est le premier header'
        }
    })
    const [changedLabels, setChangedLabels] = useState({})
    const [langs, setLangs] = useState([
        'en',
        'nl',
        'fr',
        'de',
    ])
    const langsToTitle = {
        en: 'English',
        nl: 'Nederlands',
        fr: 'Francais',
        de: 'Deutsch'
    }
    const isLabelEmpty = (labelKey, lang = '') => {
        if (lang !== '') {
            if (changedLabels[labelKey] != null && changedLabels[labelKey][lang] != null) {
                return (changedLabels[labelKey][lang] === '')
            } else
                return (labels[labelKey][lang] == null || labels[labelKey][lang] === '')
        } else {
            for (const lang of langs) {
                if (isLabelEmpty(labelKey, lang))
                    return true
            }
            return false
        }
    }
    const labelChangeHandler = (event, label, lang) => {
        setChangedLabels({
            ...changedLabels,
            [label.id]: {
                ...changedLabels[label.id],
                [lang]: event.target.value
            }
        })
    }
    const applyLabelChanges = (labelKey, lang) => {
        setLabels({
            ...labels,
            [labelKey]: {
                ...labels[labelKey],
                [lang]: changedLabels[labelKey][lang]
            }
        })
        discardLabelChanges(labelKey, lang)
    }
    const applyAllLabelChanges = () => {
        Object.keys(changedLabels).map(changedLabelKey => {
            Object.keys(changedLabels[changedLabelKey]).map(changedLabelLang => {
                applyLabelChanges(changedLabelKey, changedLabelLang)
            })
        })
        discardAllLabelChanges()
    }
    const discardLabelChanges = (labelKey, lang) => {
        setChangedLabels(labels => delete labels[labelKey][lang])
    }
    const discardAllLabelChanges = () => {
        setChangedLabels({})
    }
    return (
        <div>
            <Container>
                <h1>Editor</h1>
                <Card>

                    <Card.Header>
                        <h2>La Bastide au Ventoux</h2>
                        <Card.Link href='https://bastideventoux.com/'>bastideventoux.com</Card.Link><br />
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Header>
                    <Card.Body>

                        <h3>Labels</h3>
                        {Object.keys(labels).map((labelKey, labelIndex) => {
                            const label = labels[labelKey]
                            return (
                                <Accordion key={labelIndex} defaultActiveKey='0'>
                                    <Card key={labelIndex}>
                                        <Card.Header>
                                            <h5>{labels[labelKey].title}&nbsp;
                                                {(isLabelEmpty(label.id)) && (
                                                    <Badge variant="danger">Empty fields</Badge>
                                                )}
                                                    &nbsp;
                                                {(Object.keys(changedLabels).includes(label.id)) && (
                                                    <Badge variant='success'>New changes</Badge>)}
                                            </h5>
                                            <small>{labelKey}</small>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">Toggle</Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Tab.Container id="left-tabs-example" defaultActiveKey={langs[0]}>
                                                    <Row>
                                                        <Col sm={3}>
                                                            <Nav variant="pills" className="flex-column">
                                                                {langs.map((lang, langIndex) => {
                                                                    return (
                                                                        <Nav.Item key={langIndex}>
                                                                            <Nav.Link eventKey={lang}>
                                                                                {langsToTitle[lang]}&nbsp;
                                                                                {(isLabelEmpty(label.id, lang)) && (
                                                                                    <Badge variant="danger">empty</Badge>
                                                                                )}
                                                                                &nbsp;
                                                                                {(changedLabels[label.id] != null && changedLabels[label.id][lang] != null) && (
                                                                                    <Badge variant='success'>new</Badge>
                                                                                )}
                                                                            </Nav.Link>
                                                                        </Nav.Item>
                                                                    )
                                                                })}
                                                            </Nav>
                                                        </Col>
                                                        <Col sm={9}>
                                                            <Tab.Content>
                                                                {langs.map((lang, langKey) => {
                                                                    return (
                                                                        <Tab.Pane key={langKey} eventKey={lang}>
                                                                            <Form.Control
                                                                                as='textarea' type="text" placeholder="..."
                                                                                value={changedLabels[label.id] != null && changedLabels[label.id][lang] != null ?
                                                                                    (changedLabels[label.id][lang]) :
                                                                                    (label[lang])}
                                                                                onChange={(e) => labelChangeHandler(e, label, lang)} />
                                                                            {changedLabels[label.id] != null && changedLabels[label.id][lang] != null && (
                                                                                <div>
                                                                                    <Button variant='primary' block onClick={() => applyLabelChanges(label.id, lang)}>Apply changes</Button>
                                                                                    <Button variant='secondary' block onClick={() => discardLabelChanges(label.id, lang)}>Discard changes</Button>
                                                                                </div>
                                                                            )}
                                                                        </Tab.Pane>
                                                                    )
                                                                })}
                                                            </Tab.Content>
                                                        </Col>
                                                    </Row>
                                                </Tab.Container>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            )
                        })}
                        {Object.keys(changedLabels).length > 0 && (
                            <div>
                                <Button variant='primary' block onClick={applyAllLabelChanges}>Apply all changes</Button>
                                <Button variant='secondary' block onClick={discardAllLabelChanges}>Discard all changes</Button>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default EditorPage