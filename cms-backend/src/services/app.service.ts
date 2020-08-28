import { App } from '../models/App.model';
import { Logger } from './logger.service';
import { MongoConnection } from './mongo.service';

export const createApp = (request, response) => {
  const requestData = request.body.data
  const app = new App(requestData)

  MongoConnection.appsInfoCollection().insertOne(app, (err) => {
    if (err) {
      response.send(err)
      Logger.ApiTrace('createApp', request.url, requestData, err, {})
      return
    }
    MongoConnection.client.db(`app-${app.id}`).createCollection('cms-labels', (error) => {
      if (error) response.send(error)
      response.send({})

      Logger.ApiTrace('createApp', request.url, requestData, error, {})
    })
  })
}

export const readApp = (request, response) => {
  const requestData = request.query
  const appId = requestData.appId

  MongoConnection.appsInfoCollection().findOne({ id: appId }, {}, (err, queryResult) => {
    if (err) response.send(err)
    const responseData = new App(queryResult)
    response.json(responseData)

    Logger.ApiTrace('readApp', request.url, requestData, err, responseData)
  })
}

export const readApps = (request, response) => {
  MongoConnection.appsInfoCollection().find().toArray((err, queryResult) => {
    if (err) response.send(err)
    const responseData = queryResult.map(doc => new App(doc))
    response.json(responseData)

    Logger.ApiTrace('readApps', request.url, {}, err, responseData)
  })
}

export const updateApp = (request, response) => {
  const requestData = request.body.data
  const app = new App(requestData)

  MongoConnection.appsInfoCollection().updateOne({ id: app.id }, { $set: app }, (err, updateResult) => {
    if (err) response.send(err)
    // updateLabels(app)
    response.send({})

    Logger.ApiTrace('updateApp', request.url, requestData, err, {})
  })
}

export const deleteApp = (request, response) => { }