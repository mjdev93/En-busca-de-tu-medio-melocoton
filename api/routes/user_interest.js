const router = require('express').Router()

const { getUserInterests, createUserInterest, updateUserInterest,deleteUserInterest } = require('../controllers/user_interest')


router.get('/:id', getUserInterests)
router.post('/', createUserInterest)
router.patch('/:id', updateUserInterest) // Por donde debo pedir los datos?
router.delete('/:id', deleteUserInterest)

module.exports = router