const router = require('express').Router()

router.use('/user', require('./user'))

router.use('/interest', require('./interest'))

router.use('/user', require('./user'))

router.use('/ui', require('./user_interest'))

router.use('/videocall', require('./videocall'))

router.use('requestList', require('./requestList'))

module.exports = router
