const InfoContact = require('../models/infoContact')
const User = require('../models/user')
async function getAllUsers(req, res) {
	try {
		const users = await User.findAll()
		if (users) {
			return res.status(200).json(users)
		} else {
			return res.status(404).send('No users found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneUser(req, res) {
	try {
		const user = await User.findByPk(req.params.id)
		if (user) {
			return res.status(200).json(user)
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createInfoContact(req, res) {
    try {
   
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const infoContact = await user.createInfoContact(req.body);
        return res.status(201).json({ message: 'Información de contacto creada correctamente', infoContact });

    } catch (error) {

        console.error('Error al crear información de contacto:', error);
        return res.status(500).json({ message: 'Error al crear información de contacto' });
    }
}

async function updateUser(req, res) {
	try {
		const [userExist, user] = await User.update(req.body, {
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
		const user = await User.destroy({
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
	getAllUsers,
	getOneUser,
	createInfoContact,
	updateUser,
	deleteUser,
}
