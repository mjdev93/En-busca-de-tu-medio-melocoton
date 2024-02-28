const router = require('express').Router()

router.use('/user', require('./user'))

router.use('/interest', require('./interest'))

module.exports = router
