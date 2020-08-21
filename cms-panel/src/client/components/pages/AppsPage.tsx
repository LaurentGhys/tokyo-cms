import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { DatabaseGetApps } from '../../../global/abstraction/App.service'
import AppCards from '../../../global/components/AppCards'

const AppsPage = () => {
	const history = useHistory()
	const editorClicked = (appId) => (history.push(`client/editor/${appId}`))
	const [apps, setApps] = useState([])

	useEffect(() => {
		DatabaseGetApps()
			.then(res => setApps(res.data))
	}, [])

	return (
		<div>
			<Container>
				<h2>Dashboard</h2>
				<h3>My websites</h3>
				<AppCards>
					{apps.map((app, key) =>
						(<AppCards.AppCard
							key={key}
							app={app}
							buttons={[{ title: 'Editor', classVariant: 'primary', onClick: () => editorClicked(app.id) }]}
						/>)
					)}
				</AppCards>
			</Container>
		</div>
	)
}

export default AppsPage