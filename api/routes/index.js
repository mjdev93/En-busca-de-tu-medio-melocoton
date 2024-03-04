const router = require('express').Router()

router.use('/user', require('./user'))

router.use('/interest', require('./interest'))

router.use('/user', require('./user'))

router.use('/ui', require('./user_interest'))

router.use('/infoContact', require('./infoContact'))

router.use('/videocall', require('./videocall'))

router.use('requestList', require('./requestList'))

router.use('/auth', require('./auth'))

module.exports = router
