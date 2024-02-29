const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db')
const UserInterest = sequelize.define(
	'user_interest',
    {timestamps: false}
    
)
module.exports = UserInterest