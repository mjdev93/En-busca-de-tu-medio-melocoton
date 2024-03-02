const router = require('express').Router()

router.use('/user', require('./user'))

router.use('/interest', require('./interest'))

router.use('/user', require('./user'))

router.use('/ui', require('./user_interest'))

module.exports = router
