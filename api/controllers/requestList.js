const { Op } = require("sequelize");
const Match = require('../models/requestList');
const UserInterest = require("../models/user_interest");
const User = require("../models/user");

async function getAllMatch(req, res) {
	try {
		const match = await Match.findAll()
		if (match) {
			return res.status(200).json(match)
		} else {
			return res.status(404).send('No match found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneMatch(req, res) {
	try {
		const match = await Match.findByPk(req.params.id)
		if (match) {
			return res.status(200).json(match)
		} else {
			return res.status(404).send('Match not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createMatch(req, res) {
	try {
		const match = await Match.create(req.body)
		return res.status(200).json({ message: 'Match created', match: match })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateMatch(req, res) {
	try {
		const [matchExist, match] = await Match.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (matchExist !== 0) {
			return res.status(200).json({ message: 'Match updated', match: match })
		} else {
			return res.status(404).send('Match not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteMatch(req, res) {
	try {
		const match = await Match.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (match) {
			return res.status(200).json('Match deleted')
		} else {
			return res.status(404).send('Match not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function sendMatch(req, res){
	try {
        const matchUpdated = await checkMatchExist(req.body.receiverId, req.body.initiatorId)
        if(matchUpdated){
            return res.status(200).json({message: 'Match updated', match: matchUpdated})
        }
        else{
            const body = {
                initiatorId: req.body.initiatorId,
                receiverId: req.body.receiverId,
                status: "pending"
            }
            const match = await Match.create(body)
            return res.status(200).json({ message: 'Match created', match: match })
        }
		
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function acceptMatch(req, res){
	try {
		const [matchExist, match] = await Match.update({status: "accepted"}, {
			returning: true,
			where: {
                id: req.params.id
			},
		})
        if (matchExist !== 0) {
			return res.status(200).json({ message: 'Match accepted', match: match })
		} else {
			return res.status(404).send('Match not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function rejectMatch(req, res){
	try {
		const [matchExist, match] = await Match.update({status: "rejected"}, {
			returning: true,
			where: {
                id: req.params.id
			},
		})
        if (matchExist !== 0) {
			return res.status(200).json({ message: 'Match rejected', match: match })
		} else {
			return res.status(404).send('Match not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function myMatchList(req, res) {
	try {
		let userId, match, state
		res.locals.user.rol === "grandwa" ? userId = res.locals.user.id : userId = req.body.userId
		if(req.body.status){ state = req.body.status }
		if(!state){
			match = await Match.findAll({
				where: {
					[Op.or]: [
						{initiatorId: userId},
						{receiverId: userId}
					]
				}
			})
		}
		else{
			match = await Match.findAll({
				where: {
					[Op.and]: [
						{
						[Op.or]: [
							{initiatorId: userId},
							{receiverId: userId}
						]
					},
					{
						status: state
					}
					]
					
				}
			})
		}
		if (match) {
			return res.status(200).json(match)
		} else {
			return res.status(404).send('Match list not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function myHalfPeach(req, res){

	const userId = res.locals.user.rol === "grandwa" ? res.locals.user.id : req.body.userId
	try{
		const userInterest = await UserInterest.findAll({
			where: {
				userId: userId
			}
		})
		const userInterestList = userInterest.map((e)=>{return e.dataValues.interestId})
		let usersForInterest = []
		for(i = 0; i < userInterestList.length; i++){
			let userArray = await UserInterest.findAll({
				where: {
					interestId: userInterestList[i]
				}
			})
			usersForInterest.push(userArray.map((a) => { return a.dataValues.userId}))
		}
		usersForInterest = usersForInterest.flat().sort((a, b) => a - b)
		usersForInterest = usersForInterest.filter((e) => e != userId)
		const peaches = peachesInOrder(usersForInterest)
		const orderedPeaches = peaches.sort((a, b) => b[1] - a[1])
		const halfPeach = await User.findByPk(Number(orderedPeaches[0][0]))
		return res.status(200).json({ message: `Grandwa ${halfPeach.name} with userId ${halfPeach.id} has ${orderedPeaches[0][1]} interest in common`})
	} catch (error) {
		return res.status(500).json({ message: 'Error al buscar melocotones' });
	}
}

function peachesInOrder(peachArr){
	peachObj = {};
	peachArr.forEach((e) => {
		if(!peachObj[e]) { peachObj[e] = 0 }
		peachObj[e] += 1;
	});
	return Object.entries(peachObj)
}

async function checkMatchExist(receiverId, initiatorId) {
	try {
		const [matchExist, match] = await Match.update({status: "accepted"}, {
			returning: true,
			where: {
				receiverId: initiatorId,
                initiatorId: receiverId
			},
		})
        if (matchExist !== 0) {
			return match
		} else {
			return false
		}
	} catch (error) {
		throw new Error('Fail update')
	}
}

module.exports = {
	getAllMatch,
	getOneMatch,
	createMatch,
	updateMatch,
	deleteMatch,
	sendMatch,
	acceptMatch,
	rejectMatch,
	myMatchList,
	myHalfPeach
}