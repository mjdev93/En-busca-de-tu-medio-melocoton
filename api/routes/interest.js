const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middlewares/index')

const { getAllInterest, getOneInterest, createInterest, updateInterest, deleteInterest} = require('../controllers/interest')

router.get('/', checkAuth, getAllInterest)
router.get('/:id', checkAuth, getOneInterest)
router.post('/', checkAuth, checkAdmin, createInterest)
router.patch('/:id', checkAuth, checkAdmin, updateInterest)
router.delete('/:id', checkAuth, checkAdmin, deleteInterest)

module.exports = router

