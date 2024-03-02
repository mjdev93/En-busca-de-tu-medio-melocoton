const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db')
const RequestList = sequelize.define(
  'requestList',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    initiatorId:{
      type: DataTypes.INTEGER,
    },
    receiverId:{
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        name: 'requestList_unique_index',
        unique: true,
        fields: ['initiatorId', 'receiverId', 'status']
      }
    ]
  }

)
module.exports = RequestList