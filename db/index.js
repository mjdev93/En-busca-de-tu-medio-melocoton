const { Sequelize } = require('sequelize')
// Connect to PostgreSQL creating a new sequelize instance
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
	host: process.env.HOST,
	dialect: process.env.DIALECT,
	port: process.env.DB_PORT,
	logging: false,
	define: {
		timestamps: false  // I don't want timestamp fields by default
	  }
})
async function checkConnection() {
	try {
		await sequelize.authenticate()
		console.log('Connection to DB has been established successfully.')
	} catch (error) {
		throw error
	}
}
async function syncModels(value) {
	const state = {
		alter: { alter: true },
		force: { force: true },
	}
	try {
		await sequelize.sync(state[value] || '')
		console.log(`All models were synchronized successfully using sync(${JSON.stringify(state[value]) || ''}).`)
	} catch (error) {
		throw error
	}
}
module.exports = { sequelize, checkConnection, syncModels }
