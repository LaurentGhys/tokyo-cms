import React, { FunctionComponent } from 'react'
import { Button, Card, CardDeck } from "react-bootstrap"

type AppCardsProps = {
}

const AppCards = (props) => {
  return (
    <div>
      <CardDeck>
        {props.children}
      </CardDeck>
    </div>
  )
}

interface AppCardProps {
  title?: string
  footerText?: string
  url?: string
  urlDescription?: string
  thumbnail?: string
  appId?: string
}

const AppCard: FunctionComponent<AppCardProps> = ({
  title = 'Title',
  footerText = 'Footer text',
  url = 'https://google.com',
  urlDescription = 'google.com',
  thumbnail = 'https://via.placeholder.com/300',
  appId = 'sample-websiteid-0',
}) => {
  const editClicked = () => {
  }
  return (
    < Card >
      <Card.Img variant='top' src={thumbnail} />
      <Card.Body>
        <Card.Title as='h5'>{title}</Card.Title>
        <Button block variant='primary' onClick={editClicked}>Edit</Button>
      </Card.Body>
      <Card.Footer>
        <Card.Link href={url}>{urlDescription}</Card.Link><br />
        <small className="text-muted">{footerText}</small>
      </Card.Footer>
    </Card >
  )
}

AppCards.AppCard = AppCard

export default AppCards