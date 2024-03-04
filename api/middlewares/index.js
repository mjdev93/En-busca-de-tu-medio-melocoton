const jwt = require("jsonwebtoken")
const User = require("../models/user")

const checkAuth = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(404).send('No Token found')
  }

  jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
    if(err) return res.send('Token not valid')

    const user = await User.findOne({
      where: {
        dni: result.dni
      }
    })

    if(!user) return res.send('Token not valid')
    res.locals.user = user
    next()
  })
}

const checkAdmin = (req, res, next) => {
  //console.log(res.locals.user)
  if (res.locals.user.rol !== 'admin') {
    return res.status(401).send('Not authorized!')
  } else {
    next()
  }
}

module.exports = {
  checkAuth,
  checkAdmin
}