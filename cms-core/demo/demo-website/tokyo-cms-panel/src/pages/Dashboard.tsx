import React from 'react'
import { Button, Card, CardDeck, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
    const history = useHistory()
    const editClicked = (websiteId) => {
        history.push('/editor')
    }
    return (
        <div>
            <Container>
                <h2>Dashboard</h2>
                <h3>My websites</h3>
                <CardDeck>
                    <Card>
                        <Card.Img variant='top' src='https://bastideventoux.com/images/mont%20ventouwx%20website.jpg' />
                        <Card.Body>
                            <Card.Title as='h5'>La Bastide au Ventoux</Card.Title>
                            <Button block variant='primary' onClick={() => editClicked(1)}>Edit</Button>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Link href='https://bastideventoux.com/'>bastideventoux.com</Card.Link><br />
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant='top' src='https://bastideventoux.com/images/mont%20ventouwx%20website.jpg' />
                        <Card.Body>
                            <Card.Title as='h5'>La Bastide au Ventoux</Card.Title>
                            <Button block variant='primary' onClick={() => editClicked(1)}>Edit</Button>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Link href='https://bastideventoux.com/'>bastideventoux.com</Card.Link><br />
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant='top' src='https://bastideventoux.com/images/mont%20ventouwx%20website.jpg' />
                        <Card.Body>
                            <Card.Title as='h5'>La Bastide au Ventoux</Card.Title>
                            <Button block variant='primary' onClick={() => editClicked(1)}>Edit</Button>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Link href='https://bastideventoux.com/'>bastideventoux.com</Card.Link><br />
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </CardDeck>
            </Container>
        </div>
    )
}

export default Dashboard