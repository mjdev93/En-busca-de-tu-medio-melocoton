const router = require('express').Router()

const { getUserInterests, createUserInterest, updateUserInterest, deleteUserInterests, deleteUserInterest, getAllUsersInterests } = require('../controllers/user_interest')

router.get('/', getAllUsersInterests)
router.get('/:id', getUserInterests)
router.post('/', createUserInterest)
router.patch('/', updateUserInterest) 
router.delete('/:id', deleteUserInterests) // no funciona
router.delete('/', deleteUserInterest)

module.exports = router