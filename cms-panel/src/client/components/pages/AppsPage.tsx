import React from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import AppCards from '../../../global/components/AppCards'

const sampleWebsites = [
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

    }
]

const AppsPage = () => {
    const history = useHistory()
    const editClicked = (websiteId) => {
        history.push('/editor')
    }
    return (
        <div>
            <Container>
                <h2>Dashboard</h2>
                <h3>My websites</h3>
                <AppCards>
                    {sampleWebsites.map((website, key) =>
                        (<AppCards.AppCard
                            key={key}
                            {...(website)}
                        />)
                    )}
                </AppCards>
            </Container>
        </div>
    )
}

export default AppsPage