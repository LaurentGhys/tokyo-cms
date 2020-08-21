import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { DatabaseGetApps } from '../../../global/abstraction/App.service'
import AppCards from '../../../global/components/AppCards'

const AppsPage = () => {
  const history = useHistory()
  const settingsClicked = (appId) => (history.push(`/admin/settings/${appId}`))
  const newAppClicked = () => (history.push('/admin/newApp'))
  const [apps, setApps] = useState([])

  useEffect(() => {
    DatabaseGetApps()
      .then(res => setApps(res.data))
  }, [])

  return (
    <div>
      <Container>
        <h1>Admin dashboard</h1>
        <h3>All apps</h3>
        <AppCards>
          {apps.map((app, key) =>
            (<AppCards.AppCard
              key={key}
              app={app}
              buttons={[{ title: 'Settings', classVariant: 'secondary', onClick: () => settingsClicked(app.id) }]}
            />)
          )}
          < Card >
            <Button block variant='success' size='lg'
              onClick={newAppClicked}
            >New App</Button>
          </Card >
        </AppCards>
      </Container>
    </div>
  )
}

export default AppsPage