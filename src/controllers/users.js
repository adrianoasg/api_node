const { User } = require('../models')

const UserModel = new User()

const methods = {
  async create(request, response) {
    const { username, favouriteColor } = request.body

    if (!username || !favouriteColor) {
      return response.status(400).json({ error: 'Username and favouriteColor are required.' })
    }

    const newUser = await UserModel.insertOne({ username, favouriteColor })

    return response.status(201).json(newUser)
  },

  async list(request, response) {
    const users = await UserModel.list()

    return response.status(200).json({ users })
  }
}

module.exports = methods
