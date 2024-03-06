require('dotenv').config()
const { checkConnection, syncModels } = require('./db/index')
const addRelationsToModels = require('./db/models')
const express = require('express')
const cors = require('cors')
const router = require("./api/routes/index")
const morgan = require('morgan')
async function checkAndSyncPostgreSQL() {
  await checkConnection()
  addRelationsToModels()
  await syncModels('force')
}
function initializeAndListenWithExpress() {
  const app = express()
  .use(cors())
  .use(morgan('dev'))
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
    }
    next();
})
  .use(express.json())
  .use('/api', router)
    .listen(process.env.PORT, () => {
      console.log(`> Listening on port: ${process.env.PORT}`)
    })
}
async function startAPI() {
  await checkAndSyncPostgreSQL()
  initializeAndListenWithExpress()
}
startAPI()