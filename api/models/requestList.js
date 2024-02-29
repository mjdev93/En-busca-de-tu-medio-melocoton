const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db')
const RequestList = sequelize.define(
	'requestList',
	{
        status: {
            type: DataTypes.ENUM("pending", "accepted","rejected"),
            allowNull: false,
		},
    },
    {timestamps: false}
    
)
module.exports = RequestList