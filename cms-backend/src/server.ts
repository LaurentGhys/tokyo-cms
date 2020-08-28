import express from 'express';
import { createApp, deleteApp, readApp, readApps, updateApp } from './services/app.service';
import { createLabels, deleteLabels, readLabels, readLabelsNames, updateLabel, updateLabelsNames } from './services/labels.service';
import { MongoConnection } from './services/mongo.service';
const bodyParser = require('body-parser')
const cors = require('cors')

const backendPort = 9090

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

MongoConnection
  .connect()
  .catch(err => console.error(err))
  .then(client => {

    app.listen(backendPort, () => console.log(`Server started on port ${backendPort}, and connected to MongoDb`))

    app.post('/v1/app', createApp)
    app.get('/v1/app', readApp)
    app.get('/v1/apps', readApps)
    app.put('/v1/app', updateApp)
    app.delete('/v1/app', deleteApp)

    app.post('/v1/labels', createLabels)
    app.get('/v1/labels', readLabels)
    app.get('/v1/labels/names', readLabelsNames)
    app.put('/v1/label', updateLabel)
    app.put('/v1/labels/names', updateLabelsNames)
    app.delete('/v1/labels', deleteLabels)

    // PROTOTYPE code for syncing labels with apps
    // const updateLabels = (app: App): Promise<Object> => {
    //   client.db(`app-${app.id}`).collection('cms-labels').find().toArray((err, docs) => {
    //     if (err) return err
    //     let foundDocIds = []
    //     for (let doc of docs) {
    //       let docLabel = new Label(doc)
    //       let shouldUpdate = false
    //       if (app.cms.labelIds.includes(docLabel.id)) {
    //         foundDocIds.push(docLabel.id)
    //         let docLabelLangs = Object.keys(docLabel.values)
    //         for (let lang of app.cms.languages) {
    //           if (!docLabelLangs.includes(lang)) {
    //             shouldUpdate = true
    //             docLabel.values[lang] = ''
    //           }
    //         }
    //       }
    //       if (shouldUpdate) {
    //         client.db(`app-${app.id}`).collection('cms-labels').updateOne({ id: docLabel.id }, { $set: docLabel }, (err, doc) => {
    //           if (err) console.log(err)
    //           console.log(`Label doc ${docLabel.id} updated!`)
    //         })
    //       }
    //     }
    //     let missingLabelDocIds = app.cms.labelIds.filter(labelId => !foundDocIds.includes(labelId))
    //     for (let labelId of missingLabelDocIds) {
    //       let newDocLabel = new Label({ id: labelId, name: labelId, languages: app.cms.languages })
    //       client.db(`app-${app.id}`).collection('cms-labels').insertOne(newDocLabel, (err, doc) => {
    //         if (err) console.log(err)
    //         console.log(`Label doc ${newDocLabel.id} created!`)
    //       })
    //     }
    //   })
    // }
  })