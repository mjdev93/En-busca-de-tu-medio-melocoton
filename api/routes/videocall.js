const router = require('express').Router()

const { getAllVideocalls, getOneVideocall, createVideocall, updateVideocall, deleteVideocall, startVideocall, answerVideocall, endVideocall, myVideocalls} = require('../controllers/videocall')

router.get('/', getAllVideocalls)
router.get('/:id', getOneVideocall)
router.post('/', createVideocall)
router.patch('/:id', updateVideocall)
router.delete('/:id', deleteVideocall)
router.post('/startvideocall', startVideocall)
router.patch('/answervideocall/:id', answerVideocall)
router.patch('/endvideocall/:id', endVideocall)
router.get('/myvideocalls', myVideocalls)

module.exports = router