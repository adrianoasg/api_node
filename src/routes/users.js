const router = require('express').Router()
const { users } = require('../controllers')

router.get('/', users.list)
router.post('/', users.create)

module.exports = router
