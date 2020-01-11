const MongoDB = require('mongodb')
const { uri } = require('../database')

const MongoCliente = MongoDB.MongoClient
const ObjectID = MongoDB.ObjectID

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

class Base {
  constructor() {
    this.collection = ''
  }

  async _getMongoClientAndCollection() {
    const client = await MongoCliente.connect(uri, mongoOptions)
    const database = client.db()
    const collection = database.collection(this.collection)

    return { client, collection }
  }

  async insertOne(objectToInsert) {
    return new Promise(async (resolve, reject) => {
      const { client, collection } = await this._getMongoClientAndCollection()

      if (!collection) reject()

      collection.insertOne(objectToInsert, (error, document) => {
        if (error) reject(error)

        resolve(document.ops[0])
      })

      client.close()
    })
  }

  async list() {
    return new Promise(async (resolve, reject) => {
      const { client, collection } = await this._getMongoClientAndCollection()

      if (!collection) reject()

      collection.find({}).toArray((error, documents) => {
        if (error) reject(error)

        resolve(documents)
      })

      client.close
    })
  }
}

module.exports = Base
