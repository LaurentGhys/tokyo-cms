import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card, Col, Container, Form, Nav, Row, Tab } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DatabaseGetApp } from '../../../global/abstraction/App.service'
import { DatabaseGetLabels } from '../../../global/abstraction/Labels.service'
import { Languages } from '../../../global/abstraction/Language.service'
import { App } from '../../../global/models/App.model'
import { LabelsToKeyedData } from '../../../global/models/KeyedData.model'
import { Label } from '../../../global/models/Label.model'
import { useTrackedState } from '../../../global/store/TrackedState'

const AppEditorPage = () => {

	const [changedLabels, setChangedLabels] = useState([])
	const [app, setApp]: [App, any] = useState(null)
	const [labels, setLabels]: [Label[], any] = useState([])
	const { appId } = useParams()

	const [testState, setTestState, testStateChanges, setOriginalTestState] = useTrackedState()

	useEffect(() => {
		DatabaseGetApp(appId)
			.then(res => {
				setApp(res.data)
				DatabaseGetLabels(appId)
					.then(labelsRes => {
						const labels = labelsRes.data
						setLabels(labels)

						setOriginalTestState(LabelsToKeyedData(labels))
					})
			})
	}, [])

	useEffect(() => {
		// console.log(testStateChanges())
		console.log(testState)
	}, [testState])

	const getLabelValue = (labelId: string, langCode: string): string => (
		changedLabels.includes(labelId) ?
			changedLabels[labelId][langCode] :
			labels.filter(label => label.id === labelId)[0]
	)

	const isLabelEmpty = (labelKey, lang = '') => {
		// if (lang !== '') {
		// 	if (changedLabels[labelKey] != null && changedLabels[labelKey][lang] != null) {
		// 		return (changedLabels[labelKey][lang] === '')
		// 	} else
		// 		return (labels[labelKey][lang] == null || labels[labelKey][lang] === '')
		// } else {
		// 	for (const lang of langs) {
		// 		if (isLabelEmpty(labelKey, lang))
		// 			return true
		// 	}
		// 	return false
		// }
		return false
	}

	const labelChangeHandler = (event, labelId: string, langCode: string): void => {
		// setChangedLabels({
		// 	...changedLabels,
		// 	[labelId]: {
		// 		...changedLabels[labelId],
		// 		[lang]: event.target.value
		// 	}
		// })
	}

	const applyLabelChanges = (labelKey, lang) => {
		// setLabels({
		// 	...labels,
		// 	[labelKey]: {
		// 		...labels[labelKey],
		// 		[lang]: changedLabels[labelKey][lang]
		// 	}
		// })
		// discardLabelChanges(labelKey, lang)
	}
	const applyAllLabelChanges = () => {
		// Object.keys(changedLabels).map(changedLabelKey => {
		// 	Object.keys(changedLabels[changedLabelKey]).map(changedLabelLang => {
		// 		applyLabelChanges(changedLabelKey, changedLabelLang)
		// 	})
		// })
		// discardAllLabelChanges()
	}
	const discardLabelChanges = (labelKey, lang) => {
		// setChangedLabels(labels => delete labels[labelKey][lang])
	}
	const discardAllLabelChanges = () => {
		// setChangedLabels({})
	}
	return (
		<div>
			<Container>
				<h1>Editor</h1>
				{app !== null && (
					<Card>
						<Card.Header>
							<h2>{app.info.name}</h2>
							<Card.Link href={app.info.url}>{app.info.urlDescription}</Card.Link><br />
							<small className="text-muted">{app.id}</small>
						</Card.Header>
						<Card.Body>

							<h3>Labels</h3>
							{app.cms.labelIds.map((labelId, index) => (
								<Accordion key={index} defaultActiveKey='0'>
									<Card key={index}>
										<Card.Header>
											<h5>
												{labelId}&nbsp;
													{isLabelEmpty(labelId) && (<Badge variant="danger">Empty fields</Badge>)}
                          &nbsp;
                          {changedLabels.includes(labelId) && (<Badge variant='success'>New changes</Badge>)}
											</h5>
											<small>{labelId}</small>
											<Accordion.Toggle as={Button} variant="link" eventKey="0">Toggle</Accordion.Toggle>
										</Card.Header>
										<Accordion.Collapse eventKey="0">
											<Card.Body>
												<Tab.Container id="left-tabs-example" defaultActiveKey={app.cms.languages[0]}>
													<Row>
														<Col sm={3}>
															<Nav variant="pills" className="flex-column">
																{app.cms.languages.map((lang: string, langIndex: number) => (
																	<Nav.Item key={langIndex}>
																		<Nav.Link eventKey={lang}>
																			{Languages.filter(lng => lng.code === lang)[0].name}&nbsp;
																					{isLabelEmpty(labelId, lang) && (<Badge variant="danger">empty</Badge>)}
                                          &nbsp;
                                          {changedLabels.includes(labelId) && (<Badge variant='success'>new</Badge>)}
																		</Nav.Link>
																	</Nav.Item>
																)
																)}
															</Nav>
														</Col>
														<Col sm={9}>
															<Tab.Content>
																{app.cms.languages.map((lang, langKey) => (
																	<Tab.Pane key={langKey} eventKey={lang}>
																		<Form.Control
																			as='textarea' type="text" placeholder="..."
																			value={getLabelValue(labelId, lang)}
																			onChange={(e) => labelChangeHandler(e, labelId, lang)}
																		/>
																		{changedLabels.includes(labelId) && (
																			<div>
																				<Button variant='primary' block onClick={() => applyLabelChanges(labelId, lang)}>Apply changes</Button>
																				<Button variant='secondary' block onClick={() => discardLabelChanges(labelId, lang)}>Discard changes</Button>
																			</div>
																		)}
																	</Tab.Pane>
																)
																)}
															</Tab.Content>
														</Col>
													</Row>
												</Tab.Container>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							)
							)}
							{changedLabels.length > 0 && (
								<div>
									<Button variant='primary' block onClick={applyAllLabelChanges}>Apply all changes</Button>
									<Button variant='secondary' block onClick={discardAllLabelChanges}>Discard all changes</Button>
								</div>
							)}
						</Card.Body>
					</Card>
				)}
			</Container>
		</div>
	)
}

export default AppEditorPage