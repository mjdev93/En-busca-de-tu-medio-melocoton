const { checkAuth, checkAdmin } = require('../middlewares/index')

const router = require('express').Router()

const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require('../controllers/user')

router.get('/',checkAuth, checkAdmin, getAllUsers)
router.get('/:id', getOneUser)
router.post('/', checkAuth, checkAdmin, createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router