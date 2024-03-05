const router = require('express').Router()

const { createInfoContactFunction, getAllinfoContact, getOneInfo, updateInfoContact, deleteInfoContact } = require('../controllers/infoContact')

router.get('/', getAllinfoContact)
router.get('/:id', getOneInfo)
router.post('/:id', createInfoContactFunction)
router.patch('/:id', updateInfoContact)
router.delete('/:id', deleteInfoContact)

module.exports = router
