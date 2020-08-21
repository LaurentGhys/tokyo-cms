import React, { FunctionComponent } from 'react'
import { Button, Card, CardColumns } from "react-bootstrap"
import { App } from '../../global/models/App.model'

const AppCards = (props) => {
  return (
    <div>
      <CardColumns>
        {props.children}
      </CardColumns>
    </div>
  )
}

type AppCardButtonProps = {
  title: string
  classVariant: string
  onClick: any
}

interface AppCardProps {
  app: App
  buttons?: AppCardButtonProps[]
}

const AppCard: FunctionComponent<AppCardProps> = ({
  app,
  buttons = []
}) => {
  return (
    < Card >
      <Card.Img variant='top' src={app.info.thumbnailUrl} />
      <Card.Body>
        <Card.Title as='h5'>{app.info.name}</Card.Title>
        {buttons.map((button, buttonIndex) => (
          <Button key={buttonIndex} block variant={button.classVariant} onClick={button.onClick}>{button.title}</Button>
        ))}
      </Card.Body>
      <Card.Footer>
        <Card.Link href={app.info.url}>{app.info.urlDescription}</Card.Link><br />
        <small className="text-muted">{app.id}</small>
      </Card.Footer>
    </Card >
  )
}

AppCards.AppCard = AppCard

export default AppCards