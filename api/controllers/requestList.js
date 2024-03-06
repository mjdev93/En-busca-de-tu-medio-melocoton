const { Op } = require("sequelize");
const Match = require('../models/requestList')

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
		const match = await Match.findAll({
			where: {
				[Op.or]: [
					{initiatorId: req.body.userId},
					{receiverId: req.body.userId}
				]
			}
		})
		if (match) {
			return res.status(200).json(match)
		} else {
			return res.status(404).send('Match list not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function myPendingMatchList(req, res){
    try {
		const match = await Match.findAll({
			where: {
                [Op.and]: [
                    {[Op.or]: [
                        {initiatorId: req.body.userId},
                        {receiverId: req.body.userId}
                    ]},
                    {
                        status:"pending"
                    }
                ]
			}
		})
		if (match) {
			return res.status(200).json(match)
		} else {
			return res.status(404).send('Match list not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
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
    myPendingMatchList
}