const router = require('express').Router()

const { createInfoContact } = require('../controllers/infoContact')

//router.get('/', getAllInterest)
//router.get('/:id', getOneInterest)
router.post('/', createInfoContact)
//router.patch('/:id', updateInterest)
//router.delete('/:id', deleteInterest)

module.exports = router
