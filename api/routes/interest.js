const router = require('express').Router()

const { getAllInterest, getOneInterest, createInterest, updateInterest, deleteInterest} = require('../controllers/interest')

router.get('/', getAllInterest)
router.get('/:id', getOneInterest)
router.post('/', createInterest)
router.patch('/:id', updateInterest)
router.delete('/:id', deleteInterest)

module.exports = router

