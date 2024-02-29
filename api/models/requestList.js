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
    sender_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
    },
  },
  { timestamps: false }

)
module.exports = RequestList