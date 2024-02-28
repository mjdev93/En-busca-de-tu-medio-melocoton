const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db')
const Videocall = sequelize.define(
	'videocall',
	{
		start_hour: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        finish_hour: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    },
    {timestamps: false}
    
)
module.exports = Videocall