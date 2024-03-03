const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db')
const Videocall = sequelize.define(
	'videocall',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			unique: true
		},
		startHour: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		finishHour: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		initiatorId: {
			type: DataTypes.INTEGER,
		},
		receiverId: {
			type: DataTypes.INTEGER,
		},
		answered: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
	indexes: [
		{
			name: 'videocalls_unique_index',
			unique: true,
			fields: ['startHour', 'finishHour', 'initiatorId', 'receiverId', 'answered']
		}
	]
}
);
module.exports = Videocall