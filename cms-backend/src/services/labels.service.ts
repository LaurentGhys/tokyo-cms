import { Label } from '../models/Label.model';
import { Logger } from './logger.service';
import { MongoConnection } from './mongo.service';

export const createLabels = (request, response) => {

}

export const readLabels = (request, response) => {
  const requestData = request.query
  const appId = requestData.appId

  MongoConnection.appCmsLabelsCollection(appId)
    .find().toArray((err, docs) => {
      if (err) response.send(err)
      let responseData = docs.map(doc => (new Label(doc)))
      response.json(responseData)

      Logger.ApiTrace('readLabels', request.url, requestData, err, responseData)
    })
}

export const readLabelsNames = (request, response) => {
  const requestData = request.query
  const appId = requestData.appId
  const labelIds = requestData.labelIds

  MongoConnection.appCmsLabelsCollection(appId)
    .find({ id: { $in: labelIds } }).toArray((err, docs) => {
      if (err) response.send(err)
      let reponseData = {}
      for (let doc of docs)
        reponseData = { ...reponseData, [doc.id]: doc.name }
      response.json(reponseData)

      Logger.ApiTrace('readLabelsNames', request.url, requestData, err, reponseData)
    })
}

export const updateLabel = (request, response) => {
  const requestData = request.body.data
  const appId = requestData.appId
  console.log(appId)
  const label = requestData.label

  MongoConnection.appCmsLabelsCollection(appId).updateOne({ id: label.id }, { $set: label }, (err) => {
    if (err) response.send(err)
    response.json({})

    Logger.ApiTrace('updateLabel', request.url, requestData, err, {})
  })
}

export const updateLabelsNames = (request, response) => {
  const requestData = request.body.data
  const appId = requestData.appId
  const labelNames = request.body.data.labelNames

  var bulkUpdateOperations = Object.keys(labelNames).map(labelId => ({
    'updateOne': {
      'filter': { 'id': labelId },
      'update': { '$set': { name: labelNames[labelId] } }
    }
  }))

  MongoConnection.appCmsLabelsCollection(appId)
    .bulkWrite(bulkUpdateOperations, (err, bulkresponse) => {
      if (err) response.send(err)
      response.json({})

      Logger.ApiTrace('updateLabelsNames', request.url, requestData, err, {})
    })
}

export const deleteLabels = (request, response) => { }