const router = require('express').Router()

const { getAllMatch, getOneMatch, createMatch, updateMatch, deleteMatch, sendMatch, acceptMatch, rejectMatch, myMatchList, myPendingMatchList} = require('../controllers/requestList')

router.get('/', getAllMatch) // funciona
router.get('/mymatchlist', myMatchList) // funciona
router.get('/mypendingmatchlist', myPendingMatchList) // funciona
router.get('/:id', getOneMatch) // funciona
router.post('/sendmatch', sendMatch) //funciona
router.post('/', createMatch) // funciona
router.patch('/acceptmatch/:id', acceptMatch) // funciona
router.patch('/rejectmatch/:id', rejectMatch) // funciona
router.patch('/:id', updateMatch) // funciona
router.delete('/:id', deleteMatch) // funciona




module.exports = router