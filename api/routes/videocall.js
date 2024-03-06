const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middlewares/index')

const { getAllVideocall, getOneVideocall, createVideocall, updateVideocall, deleteVideocall, startVideocall, answerVideocall, endVideocall, myVideocalls} = require('../controllers/videocall')

router.get('/', checkAuth, checkAdmin, getAllVideocall)
router.get('/myvideocalls', checkAuth, myVideocalls)
router.get('/:id', checkAuth, checkAdmin, getOneVideocall)
router.post('/', checkAuth, checkAdmin, createVideocall)
router.delete('/:id', checkAuth, checkAdmin, deleteVideocall)
router.post('/startvideocall', checkAuth, startVideocall)
router.patch('/answervideocall/:id', checkAuth, answerVideocall)
router.patch('/endvideocall/:id', checkAuth, endVideocall)
router.patch('/:id', checkAuth, checkAdmin, updateVideocall)

module.exports = router