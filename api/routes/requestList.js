const router = require('express').Router()

const { getAllMatch, getOneMatch, createMatch, updateMatch, deleteMatch, sendMatch, acceptMatch, rejectMatch, myMatchList, myPendingMatchList} = require('../controllers/requestList')

router.get('/', getAllMatch)
router.get('/:id', getOneMatch)
router.post('/', createMatch)
router.patch('/:id', updateMatch)
router.delete('/:id', deleteMatch)
router.post('/sendmatch', sendMatch)
router.patch('/acceptmatch/:id', acceptMatch)
router.patch('/rejectmatch/:id', rejectMatch)
router.get('/mymatchlist', myMatchList)
router.get('/mypendingmatchlist', myPendingMatchList)

module.exports = router