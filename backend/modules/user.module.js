const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const User = require('../models/userModel')

const secret = process.env.JWT_SECRET
const expired = process.env.JWT_EXPIRED

class user {
    listUser = async () => {
        try {
            const users = await User.find()

            const data = []
            for (const value of users) {
                data.push({
                    id: value._id,
                    name: value.name,
                    emaiL: value.email,
                    phone: value.phone
                })
            }
            
            return {
                status: true,
                data
            }
        } catch (error) {
            console.error('listUser user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    createUser = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                phone: Joi.string()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map((detail) => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const create = await User.create({
                name: body.name,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
                phone: body.phone
            })

            if (create) {
                const data = {
                    _id: create.id,
                    name: create.name,
                    email: create.email,
                    phone: create.phone
                }

                return {
                    status: true,
                    code: 201,
                    data
                }
            }

            return {
                status: false,
                error: 'Invalid user data'
            }
        } catch (error) {
            console.error('createUser user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    updateUser = async (body) => {
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                phone: Joi.string()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map((detail) => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const findUser = await User.findById(body.id)

            if (!findUser) {
                return {
                    status: false,
                    error: 'Sorry, user not found'
                }
            }

            const input = {
                name: body.name,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
                phone: body.phone
            }

            const updateUser = await User.findByIdAndUpdate(body.id, input, { new: true})

            const data = {
                _id: updateUser.id,
                name: updateUser.name,
                email: updateUser.email,
                phone: updateUser.phone
            }

            return {
                status: true,
                data
            }
        } catch (error) {
            console.error('updateUser user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteUser = async (id) => {
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
            }).options({ abortEarly: false })

            const validation = schema.validate({id})

            if (validation.error) {
                const errorDetails = validation.error.details.map((detail) => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const user = await User.findById(id)

            if (!user) {
                return {
                    status: false,
                    error: 'Sorry, user not found'
                }
            }

            // const deleteUser = await User.deleteOne({id})
            await user.remove()

            return {
                status: true,
                data: `User ${id} have been deleted`
            }
        } catch (error) {
            console.error('deleteUser user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    login = async (body) => {
        try {
            const schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map((detail) => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const user = await User.findOne({email: body.email})

            if (!user) {
                return {
                    status: false,
                    error: 'Sorry, user not found'
                }
            }

            const payload = {
                i: user._id,
                n: user.name,
                e: user.email
            }

            if(bcrypt.compareSync(body.password, user.password)) {
                const token = jwt.sign(payload, secret, {expiresIn: String(expired)})

                return {
                    status: true,
                    data: {
                        token
                    }
                }
            }

            return {
                status: false,
                error: 'Password salah'
            }
        } catch (error) {
            console.error('login user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    userById = async (id) => {
        try {
            const user = await User.findById(id)

            const data = {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }

            return {
                status: true,
                data
            }
        } catch (error) {
            console.error('userById user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new user()