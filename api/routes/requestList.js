const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middlewares/index')

const { getAllMatch, getOneMatch, createMatch, updateMatch, deleteMatch, sendMatch, acceptMatch, rejectMatch, myMatchList, myHalfPeach} = require('../controllers/requestList')

router.get('/', checkAuth, checkAdmin, getAllMatch) // funciona
router.get('/myhalfpeach', checkAuth, myHalfPeach)
router.get('/mymatchlist', checkAuth, myMatchList) // funciona
router.get('/:id', checkAuth, checkAdmin, getOneMatch) // funciona
router.post('/sendmatch', checkAuth, sendMatch) //funciona
router.post('/', checkAuth, checkAdmin, createMatch) // funciona
router.patch('/acceptmatch/:id', checkAuth, acceptMatch) // funciona
router.patch('/rejectmatch/:id', checkAuth, rejectMatch) // funciona
router.patch('/:id', checkAuth, checkAdmin, updateMatch) // funciona
router.delete('/:id', checkAuth, checkAdmin, deleteMatch) // funciona





module.exports = router