const Base = require('./Base')

class User extends Base {
  constructor() {
    super()
    this.collection = 'users'
  }
}

module.exports = User
