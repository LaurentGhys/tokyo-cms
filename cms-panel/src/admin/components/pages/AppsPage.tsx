import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import AppCards from '../../../global/components/AppCards'

const sampleApps = [
  {
    title: 'La Bastide au Ventoux',
    footerText: 'Last updated 3 mins ago',
    url: 'https://bastideventoux.com/',
    urlDescription: 'bastideventoux.com',
    thumbnail: 'https://bastideventoux.com/images/mont%20ventouwx%20website.jpg',
    appId: 'static-bastideventoux-0',
  },
  {
    title: 'Pizza Phil',
    footerText: 'Last updated 2 months ago',
    url: 'http://pizzabedoin.fr/',
    urlDescription: 'pizzabedoin.fr',
    thumbnail: 'http://pizzabedoin.fr/images/online--pizza.jpg',
    appId: 'webflow-pizzabedoin-0',
  },
  {
    title: 'Leaurend les jardins verts',
    footerText: 'Last updated 3 weeks ago',
    url: 'https://leaurendjardins.com/index.html',
    urlDescription: 'leaurendjardins.com',
    thumbnail: 'https://leaurendjardins.com/images/25.JPG',
    appId: 'webflow-leaurendjardin-0',
  }
]


const AppsPage = () => {
  const history = useHistory()
  const editClicked = (appId) => (history.push('/editor'))
  const newAppClicked = () => (history.push('/admin/newApp'))
  return (
    <div>
      <Container>
        <h1>Admin dashboard</h1>
        <h3>All apps</h3>
        <AppCards>
          {sampleApps.map((website, key) =>
            (<AppCards.AppCard
              key={key}
              {...(website)}
            />)
          )}
          < Card >
            <Button block variant='success' size='lg'
              onClick={newAppClicked}
              style={{ height: '100%' }}
            >New App</Button>
          </Card >
        </AppCards>
      </Container>
    </div>
  )
}

export default AppsPage