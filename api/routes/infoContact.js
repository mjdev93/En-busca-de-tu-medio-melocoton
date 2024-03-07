const router = require('express').Router()
const {
    checkAuth,
    checkAdmin
  } = require("../middlewares/index")

const { createInfoContactFunction, getAllinfoContact, getOneInfo, updateInfoContact, deleteInfoContact } = require('../controllers/infoContact')

router.get('/', checkAuth, checkAdmin, getAllinfoContact)
router.get('/:id', checkAuth, getOneInfo)
router.post('/:id', checkAuth, createInfoContactFunction)
router.patch('/:id',  checkAuth, updateInfoContact)
router.delete('/:id', checkAuth, deleteInfoContact)

module.exports = router