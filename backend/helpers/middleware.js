const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const userSession = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Get User from the token
        req.user = await User.findById(decoded.i).select('-password')

        next()
      } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Not authorized'})
        // throw new Error('Not authorized')
      }
  }

  if (!token) {
      res.status(401).send({message: 'Not authorized, no token'})
      // throw new Error('Not authorized, no token')
  }
}

module.exports = { userSession }
