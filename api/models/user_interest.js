const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db')
const UserInterest = sequelize.define(
    'user_interest', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },

},
    { timestamps: false }

)
module.exports = UserInterest