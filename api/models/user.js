const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db')
const User = sequelize.define(
	'user',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dni: {
            type: DataTypes.STRING,
            /*allowNull: false,
            unique: true */
        },
        phone: {
			type: DataTypes.STRING,
           /* allowNull: false,
            unique: true*/ 
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
		},
        password: {
            type: DataTypes.STRING,
            allowNull: false,
		},
        rol: {
            type: DataTypes.ENUM("grandwa", "admin"),
            allowNull: false,
		},
        
    },
    {
        indexes: [
            {
                unique: true,
                allowNull: false,
                fields: ['dni']
            },

            {
                unique: true,
                allowNull: false,
                fields: ['phone']
            }
        ]
    },
   
)
module.exports = User