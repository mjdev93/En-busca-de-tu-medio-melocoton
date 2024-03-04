const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
  try {

    const saltRounds = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
    req.body.password = hashedPassword
    const payload = {dni: req.body.dni}
    const secret = process.env.SECRET
    const token = jwt.sign(payload, secret, {expiresIn: '1h'})
    await User.create(req.body)
    return res.status(200).json({token})
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

const login = async (req, res) => {
  
	try {
    const user = await User.findOne({
      where: {
        dni: req.body.dni
      }
    })
    
    if (!user) return res.status(404).send('Error: Email or Password incorrect') // Error in case we don't find the email
    const comparePass = bcrypt.compareSync(req.body.password, user.password)
    if (comparePass) {
      const payload = {dni: req.body.dni}
      const secret = process.env.SECRET
      const token = jwt.sign(payload, secret, {expiresIn: '1h'})
       return res.status(200).json({token})
    } else {
        return res.status(404).json('Error: Email or Password incorrect')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

module.exports = {
  signup,
  login
}