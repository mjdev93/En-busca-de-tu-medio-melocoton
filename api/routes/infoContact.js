const router = require('express').Router()

const { createInfoContact, getAllinfoContact, getOneInfo } = require('../controllers/infoContact')

router.get('/', getAllinfoContact)
router.get('/:id', getOneInfo)
router.post('/', createInfoContact)
//router.patch('/:id', updateInterest)
//router.delete('/:id', deleteInterest)

module.exports = router
