const uri = require('mongodb-uri')
const secrets = require('../../secrets.json')

const mongoURI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URL
    : uri.format({
        username: secrets.username,
        password: secrets.password,
        hosts: [
          {
            host: secrets.host,
            port: secrets.port
          }
        ],
        database: secrets.database
      })

module.exports = mongoURI
