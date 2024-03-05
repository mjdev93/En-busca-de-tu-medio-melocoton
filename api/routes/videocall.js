const router = require('express').Router()

const { getAllVideocall, getOneVideocall, createVideocall, updateVideocall, deleteVideocall, startVideocall, answerVideocall, endVideocall, myVideocalls} = require('../controllers/videocall')

router.get('/', getAllVideocall) // funciona
router.get('/myvideocalls', myVideocalls) // funciona
router.get('/:id', getOneVideocall) // funciona
router.post('/', createVideocall) // funciona
router.delete('/:id', deleteVideocall) // funciona
router.post('/startvideocall', startVideocall) // funciona
router.patch('/answervideocall/:id', answerVideocall) // funciona
router.patch('/endvideocall/:id', endVideocall) // funciona
router.patch('/:id', updateVideocall) // funciona

module.exports = router