const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db')
const InfoContact = sequelize.define(
	'infoConctact',
	{
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.STRING,
            allowNull: false,
            allowNull: false,
        },
        gender: {
			type: DataTypes.ENUM("women", "men","nonbinary","unspecified"),
            allowNull: false,
            
        },
        availability: {
            type: DataTypes.STRING,
            allowNull: true,
		},
        aboutMe: {
            type: DataTypes.STRING,
            allowNull: false,
		},
    },
    {timestamps: false}
    
)
module.exports = InfoContact 
