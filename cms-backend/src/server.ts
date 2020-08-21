import express from 'express'
import { App } from './models/App.model'
import { Label } from './models/Label.model'
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

const mongoUri = 'mongodb+srv://tokyo-cms-backend-app:dqHMLcpgmzECfrWM@cluster0.43vhk.mongodb.net/tokyo-cms-backend-app?retryWrites=true&w=majority'
const mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

mongoClient
  .connect()
  .catch(err => console.error(err))
  .then(client => {

    app.listen(9090, () => {
      console.log('Listening on port 9090')
    })

    app.post('/v1/app', (req, res) => {
      const app = new App(req.body.data)
      client.db('apps').collection('info').insertOne(app)
        .then(dbRes => {
          client.db(`app-${app.id}`).createCollection('cms-labels')
            .then(colRes => {
              updateLabels(app)
              res.send('success')
            })
            .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
    })

    app.put('/v1/app', (req, res) => {
      const app = new App(req.body.data)
      client.db('apps').collection('info').updateOne({ id: app.id }, { $set: app }, (err, doc) => {
        if (err) res.send(err)
        updateLabels(app)
        res.json(app)
      })
    })

    app.put('/v1/label', (req, res) => {
      const appId = req.body.data.appId
      const label = new Label(req.body.data.label)
      client.db(`app-${appId}`).collection('cms-labels').updateOne({ id: label.id }, { $set: label }, (err, doc) => {
        if (err) res.send(err)
        res.json(label)
      })
    })

    const updateLabels = (app: App) => {
      client.db(`app-${app.id}`).collection('cms-labels').find().toArray((err, docs) => {
        if (err) return err
        let foundDocIds = []
        for (let doc of docs) {
          let docLabel = new Label(doc)
          let shouldUpdate = false
          if (app.cms.labelIds.includes(docLabel.id)) {
            foundDocIds.push(docLabel.id)
            let docLabelLangs = Object.keys(docLabel.values)
            for (let lang of app.cms.languages) {
              if (!docLabelLangs.includes(lang)) {
                shouldUpdate = true
                docLabel.values[lang] = ''
              }
            }
          }
          if (shouldUpdate) {
            client.db(`app-${app.id}`).collection('cms-labels').updateOne({ id: docLabel.id }, { $set: docLabel }, (err, doc) => {
              if (err) console.log(err)
              console.log(`Label doc ${docLabel.id} updated!`)
            })
          }
        }
        let missingLabelDocIds = app.cms.labelIds.filter(labelId => !foundDocIds.includes(labelId))
        for (let labelId of missingLabelDocIds) {
          let newDocLabel = new Label({ id: labelId, name: labelId, languages: app.cms.languages })
          client.db(`app-${app.id}`).collection('cms-labels').insertOne(newDocLabel, (err, doc) => {
            if (err) console.log(err)
            console.log(`Label doc ${newDocLabel.id} created!`)
          })
        }
      })
    }

    // compare app.cms.labelId and docs => 
    // if (label missing in docs) create new empty label in docs
    //     else if (doc missing in labels) IGNORE FOR NOW
    //     else if (docs in label | label in docs)  
    //                if (doc.values.keys and app.cms.languages are same) ALL GOOD!
    //                else if (doc.values.keys doesnt have all app.cms.languages) add empty value langues to doc.values
    //                else IGNORE FOR NOW 


    app.delete('/v1/app', (req, res) => {
      console.log(req.body.appId)
    })

    app.get('/v1/app', (req, res) => {
      const appId = req.query.appId
      client.db('apps').collection('info').findOne({ id: appId }, {}, (err, doc) => {
        if (err) res.send(err)
        res.json(new App(doc))
      })
    })

    app.get('/v1/apps', (req, res) => {
      client.db('apps').collection('info').find().toArray((err, docs) => {
        if (err) res.send(err)
        res.json(docs.map(doc => new App(doc)))
      })
    })

  })