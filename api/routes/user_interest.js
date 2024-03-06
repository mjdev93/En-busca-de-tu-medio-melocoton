const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middlewares/index')

const { getUserInterests, createUserInterest, deleteUserInterests, deleteUserInterest, getAllUsersInterests } = require('../controllers/user_interest')

router.get('/', checkAuth, checkAdmin, getAllUsersInterests)
router.get('/userinterests', checkAuth, getUserInterests)
router.post('/', checkAuth, createUserInterest)
router.post('/:id', checkAuth, checkAdmin, createUserInterest)
router.delete('/:id', checkAuth, checkAdmin, deleteUserInterests)
router.delete('/', checkAuth, deleteUserInterest) 

module.exports = router