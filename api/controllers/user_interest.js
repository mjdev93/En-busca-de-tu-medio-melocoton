const UserInterest = require('../models/user_interest')
const User = require('../models/user')
const Interest = require('../models/interest')

async function getAllUsersInterests(req, res) {
	try {
		const users = await UserInterest.findAll()
		if (users) {
			return res.status(200).json(users)
		} else {
			return res.status(404).send('No users interests found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getUserInterests(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) {
            const interests = await user.getInterests();
            return res.status(200).send(interests)
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function createUserInterest(req, res) {
    try {
        const { userId, interestId } = req.body;
        if (!userId || !interestId) {
            return res.status(400).json({ message: 'Faltan parámetros en el cuerpo de la solicitud' });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const interest = await Interest.findByPk(interestId);
        if (!interest) {
            return res.status(404).json({ message: 'Interés no encontrado' });
        }
        await user.addInterest(interest);
        return res.status(201).json({ message: 'Interés añadido al usuario correctamente' });
    } catch (error) {
        console.error('Error al añadir interés al usuario:', error);
        return res.status(500).json({ message: 'Error al añadir interés al usuario' });
    }
}

async function updateUserInterest(req, res) {
    try {
        const { userId, interestId } = req.body;
        if (!userId || !interestId) {
            return res.status(400).json({ message: 'Faltan parámetros en el cuerpo de la solicitud' });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const interest = await Interest.findByPk(interestId);
        if (!interest) {
            return res.status(404).json({ message: 'Interés no encontrado' });
        }

        // Verificar si el usuario ya tiene este interés
        const existingUserInterest = await UserInterest.findOne({
            where: {
                userId: userId,
                interestId: interestId
            }
        });

        if (existingUserInterest) {
            return res.status(400).json({ message: 'El usuario ya tiene este interés' });
        }

        // Si no tiene el interés, lo agregamos
        await user.addInterest(interest);
        return res.status(200).json({ message: 'Interés actualizado correctamente para el usuario' });
    } catch (error) {
        console.error('Error al actualizar interés del usuario:', error);
        return res.status(500).json({ message: 'Error al actualizar interés del usuario' });
    }
}

// Elimina todos los intereses asociados a un user
async function deleteUserInterests(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        const ui = await UserInterest.findAll({
            where: {
                userId: req.params.id
            }
        })
        const interest = ui.map((e)=>{return e.dataValues.interestId})
        const removeUser = await user.removeInterests(interest)
        return res.send(200).json({message: 'Intereses eliminados'})

    } catch (error) {
        console.error('Error al eliminar intereses del usuario:', error);
        return res.status(500).json({ message: 'Error al eliminar intereses del usuario' });
    }
}
// Elimina un interes asociado a un usuario
async function deleteUserInterest(req, res) {
    try {
        const { userId, interestId } = req.body;

        // Buscar el usuario por su ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado :(' });
        }

        // Verificar si el usuario tiene intereses asociados
        const interestsCount = await user.countInterests();

        if (interestsCount === 0) {
            return res.status(404).json({ message: 'El usuario no tiene intereses asociados' });
        }

        // Eliminar el interés específico del usuario utilizando el método removeInterest
        await user.removeInterest(interestId);

        // Enviar respuesta de éxito
        return res.status(200).json({ message: 'Interés eliminado del usuario correctamente' });
    } catch (error) {
        // Manejar errores
        console.error('Error al eliminar interés del usuario:', error);
        return res.status(500).json({ message: 'Error al eliminar interés del usuario' });
    }
}

module.exports = {
    getAllUsersInterests,
    getUserInterests,
    createUserInterest,
    updateUserInterest,
    deleteUserInterests,
    deleteUserInterest
}
