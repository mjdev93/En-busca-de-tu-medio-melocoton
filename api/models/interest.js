const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db')
const Interest = sequelize.define(
	'interest',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    },

    
)
module.exports = Interest