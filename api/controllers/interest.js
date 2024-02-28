const Interest = require('../models/interest')

async function getAllInterest(req, res) {
	try {
		const interest = await Interest.findAll()
		if (interest) {
			return res.status(200).json(interest)
		} else {
			return res.status(404).send('No interest found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneInterest(req, res) {
	try {
		const interest = await Interest.findByPk(req.params.id)
		if (interest) {
			return res.status(200).json(interest)
		} else {
			return res.status(404).send('Interest not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createInterest(req, res) {
	try {
		const interest = await Interest.create(req.body)
		return res.status(200).json({ message: 'Interest created', interest: interest })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateInterest(req, res) {
	try {
		const [interestExist, interest] = await Interest.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (interestExist !== 0) {
			return res.status(200).json({ message: 'Interest updated', interest: interest })
		} else {
			return res.status(404).send('Interest not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteInterest(req, res) {
	try {
		const interest = await Interest.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (interest) {
			return res.status(200).json('interest deleted')
		} else {
			return res.status(404).send('Interest not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllInterest,
	getOneInterest,
	createInterest,
	updateInterest,
	deleteInterest
}
