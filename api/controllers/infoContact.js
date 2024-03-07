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
	const user = res.local.user
    if (user.rol !== "admin" && user.id !==  req.params.id ){
        return res.status(403).send("No estas autorizado") 
    }
	try {
		const infoUser = await InfoContact.findByPk(userId)
		console.log(infoUser)
		if (infoUser) {
			return res.status(200).json(infoUser)
		} else {
			return res.status(404).send('User info not found')
		}
	} catch (error) {
		console.error('Error al mostrar informacion de contacto', error);
		res.status(500).send(error.message)
	}
}

async function createInfoContactFunction(req, res) {
	const user = res.local.user
    if (user.rol !== "admin" && user.id !==  req.params.id ){
        return res.status(403).send("No estas autorizado") 
    }

	try {

		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}
		const infoContact = await InfoContact.create(req.body);
		const userContact = await infoContact.setUser(user)
		return res.status(201).json({ message: 'Información de contacto creada correctamente', infoContact });

	} catch (error) {

		console.error('Error al crear información de contacto:', error);
		return res.status(500).json({ message: 'Error al crear información de contacto' });
	}
}

async function updateInfoContact(req, res) {

	const user = res.local.user
    if (user.rol !== "admin" && user.id !==  req.params.id ){
        return res.status(403).send("No estas autorizado") 
    }

	try {
		const [infoExist, info] = await InfoContact.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (infoExist !== 0) {
			return res.status(200).json({ message: 'Info updated', info: info })
		} else {
			return res.status(404).send('Info not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteInfoContact(req, res) {

	const user = res.local.user
    if (user.rol !== "admin" && user.id !==  req.params.id ){
        return res.status(403).send("No estas autorizado") 
    }

	try {
		const user = await InfoContact.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (user) {
			return res.status(200).json('Info deleted')
		} else {
			return res.status(404).send('Info not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllinfoContact,
	getOneInfo,
	createInfoContactFunction,
	updateInfoContact,
	deleteInfoContact
}
