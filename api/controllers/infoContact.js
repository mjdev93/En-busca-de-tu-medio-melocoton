const InfoContact = require('../models/infoContact')
const User = require('../models/user')

async function getAllinfoContact(req, res) {
	try {
		const infoContact = await InfoContact.findAll()
		if (infoContact) {
			return res.status(200).json(infoContact)
		} else {
			return res.status(404).send('No info Contact found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneInfo(req, res) {
	try {
		const infoUser = await InfoContact.findByPk(req.params.id)
		if (infoUser) {
			return res.status(200).json(infoUser)
		} else {
			return res.status(404).send('User info not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createInfoContact(req, res) {
	try {
   
        const infoContact = await InfoContact.create(req.body)
        return res.status(201).json({ message: 'Información de contacto creada correctamente', infoContact });

    } catch (error) {

        console.error('Error al crear información de contacto:', error);
        return res.status(500).json({ message: 'Error al crear información de contacto' + error });
    }

}
async function updateUser(req, res) {
	try {
		const [userExist, user] = await InfoContact.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (userExist !== 0) {
			return res.status(200).json({ message: 'User updated', user: user })
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteUser(req, res) {
	try {
		const user = await InfoContact.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (user) {
			return res.status(200).json('User deleted')
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllinfoContact,
	getOneInfo,
	createInfoContact,
	updateUser,
	deleteUser,
}
