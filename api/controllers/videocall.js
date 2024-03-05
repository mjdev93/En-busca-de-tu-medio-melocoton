const { Op } = require("sequelize");
const Videocall = require('../models/videocall')

async function getAllVideocall(req, res) {
	try {
		const videocall = await Videocall.findAll()
		if (videocall) {
			return res.status(200).json(videocall)
		} else {
			return res.status(404).send('No videocall found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneVideocall(req, res) {
	try {
		const videocall = await Videocall.findByPk(req.params.id)
		if (videocall) {
			return res.status(200).json(videocall)
		} else {
			return res.status(404).send('Videocall not found 1')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createVideocall(req, res) {
	try {
		const videocall = await Videocall.create(req.body)
		return res.status(200).json({ message: 'Videocall created', videocall: videocall })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateVideocall(req, res) {
	try {
		const [videocallExist, videocall] = await Videocall.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (videocallExist !== 0) {
			return res.status(200).json({ message: 'Videocall updated', videocall: videocall })
		} else {
			return res.status(404).send('Videocall not found 2')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteVideocall(req, res) {
	try {
		const videocall = await Videocall.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (videocall) {
			return res.status(200).json('Videocall deleted')
		} else {
			return res.status(404).send('Videocall not found 3')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function startVideocall(req, res){
	try {
		const body = {
			startHour: Date.now(),
			finishHour: null,
			initiatorId: req.body.initiatorId,
			receiverId: req.body.receiverId
		}
		const videocall = await Videocall.create(body)
		return res.status(200).json({ message: 'Videocall created', videocall: videocall })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function answerVideocall(req, res){
	try {
		const [videocallExist, videocall] = await Videocall.update({answered: true}, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (videocallExist !== 0) {
			return res.status(200).json({ message: 'Videocall answered', videocall: videocall })
		} else {
			return res.status(404).send('Videocall not found 4')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function endVideocall(req, res){
	try {
		const [videocallExist, videocall] = await Videocall.update({finishHour: Date.now()}, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (videocallExist !== 0) {
			return res.status(200).json({ message: 'Videocall finished', videocall: videocall })
		} else {
			return res.status(404).send('Videocall not found :(')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function myVideocalls(req, res) {
    try {
        const videocall = await Videocall.findAll({
            where: {
                [Op.or]: [
                    {initiatorId: req.body.userId},
                    {receiverId: req.body.userId}
                ]
            }
        })
        if(videocall) {
            return res.status(200).json(videocall)
        } else {
            return res.status(404).send('Videocall not found O')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}



module.exports = {
	getAllVideocall,
	getOneVideocall,
	createVideocall,
	updateVideocall,
	deleteVideocall,
	startVideocall,
	answerVideocall,
	endVideocall,
	myVideocalls
}
