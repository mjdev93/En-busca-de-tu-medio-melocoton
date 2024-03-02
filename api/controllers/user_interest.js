const UserInterest = require('../models/user_interest')
const User = require('../models/user')
const Interest = require('../models/interest')



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

        // Verificar si los datos necesarios están presentes en el cuerpo de la solicitud
        if (!userId || !interestId) {
            return res.status(400).json({ message: 'Faltan parámetros en el cuerpo de la solicitud' });
        }

        // Buscar el usuario por su ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Buscar el interés por su ID
        const interest = await Interest.findByPk(interestId);

        if (!interest) {
            return res.status(404).json({ message: 'Interés no encontrado' });
        }

        // Añadir el interés al usuario utilizando el método addInterest
        await user.addInterest(interest);

        // Enviar respuesta de éxito
        return res.status(201).json({ message: 'Interés añadido al usuario correctamente' });
    } catch (error) {
        // Manejar errores
        console.error('Error al añadir interés al usuario:', error);
        return res.status(500).json({ message: 'Error al añadir interés al usuario' });
    }
}

async function updateUserInterest(req, res) {
    try {
        const userId = req.params.userId;
        const { interestId } = req.body;

        // Verificar si los datos necesarios están presentes en el cuerpo de la solicitud
        if (!interestId) {
            return res.status(400).json({ message: 'Falta el ID del interés en el cuerpo de la solicitud' });
        }

        // Buscar el usuario por su ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Buscar el interés por su ID
        const interest = await Interest.findByPk(interestId);

        if (!interest) {
            return res.status(404).json({ message: 'Interés no encontrado' });
        }

        // Modificar los intereses del usuario utilizando el método setInterests
        await user.setInterests([interest]);

        // Enviar respuesta de éxito
        return res.status(200).json({ message: 'Interés modificado para el usuario correctamente' });
    } catch (error) {
        // Manejar errores
        console.error('Error al modificar interés del usuario:', error);
        return res.status(500).json({ message: 'Error al modificar interés del usuario' });
    }
}

async function deleteUserInterest(req, res) {
    try {
        const user = await UserInterest.destroy({
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
    getUserInterests,
    createUserInterest,
    updateUserInterest,
    deleteUserInterest
}
