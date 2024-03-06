const { checkAuth, checkAdmin } = require('../middlewares/index')

const router = require('express').Router()

const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require('../controllers/user')

router.get('/',checkAuth, checkAdmin, getAllUsers)
router.get('/:id', checkAuth, checkAdmin, getOneUser)
router.post('/', checkAuth, checkAdmin, createUser)
router.patch('/:id', checkAuth, checkAdmin, updateUser)
router.delete('/:id', checkAuth, checkAdmin, deleteUser)

module.exports = router