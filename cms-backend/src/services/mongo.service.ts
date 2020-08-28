import { Collection } from "mongodb"

const MongoClient = require('mongodb').MongoClient

const mongoUri = 'dontshowthis'
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export class MongoConnection {

  static client: any = null

  static appsInfoCollection(): Collection {
    return this.client.db('apps').collection('info')
  }

  static appCmsLabelsCollection(appId): Collection {
    return this.client.db(`app-${appId}`).collection('cms-labels')
  }

  static connect() {
    if (this.client) return Promise.resolve(this.client)
    MongoClient.connect(mongoUri, mongoOptions).then(connectedClient => this.client = connectedClient)
    return Promise.resolve(this.client)
  }
}

//https://stackoverflow.com/questions/49397608/what-is-best-way-to-handle-global-connection-of-mongodb-in-nodejs