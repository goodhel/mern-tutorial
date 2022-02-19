import UserModel from "../models/user.model";
import Joi from "joi";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'merntutorialscretkey'

interface CreateUser {
    name: string
    email: string
    password: string
    phone?: string
}

interface UpdateUser {
    id: string
    name: string
    email: string
    password: string
    phone?: string
}

interface Login {
    email: string
    password: string
}

class _user {
    listUser = async () => {
        try {
            const user = await UserModel.find()

            const data = []

            for (const value of user) {
                data.push({
                    id: value.id,
                    name: value.name,
                    email: value.email,
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

    createUser = async (body: CreateUser) => {
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

            const user = await UserModel.create({
                name: body.name,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
                phone: body.phone
            })

            return {
                status: true,
                code: 201,
                data: user
            }
        } catch (error) {
            console.error('createUser user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    updateUser = async (body: UpdateUser) => {
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

            const user = await UserModel.findById(body.id)

            if (!user) {
                return {
                    status: false,
                    error: 'Sorry, user not found'
                }
            }

            const input = {
                name: body.name,
                email: body.email,
                password: bcrypt.hashSync(body.password,10),
                phone: body.phone
            }

            const update = await UserModel.findByIdAndUpdate(body.id, input, {new: true})

            const data = {
                _id: update.id,
                name: update.name,
                email: update.email,
                phone: update.phone
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

    deleteUser = async (id: string) => {
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

            const user = await UserModel.findById(id)

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

    login = async (body: Login) => {
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

            const user = await UserModel.findOne({email: body.email})

            if (!user) {
                return {
                    status: false,
                    error: 'Sorry, user not found'
                }
            }

            const payloadUser = {
                i: user._id,
                n: user.name,
                e: user.email
            }

            if (user && bcrypt.compareSync(body.password, user.password)) {
                const token = jwt.sign(payloadUser, secret, {expiresIn: '30d'})

                return {
                    status: true,
                    data: {
                        name: user.name,
                        token
                    }
                }
            }

            return {
                status: false,
                error: 'Wrong Password'
            }
            
        } catch (error) {
            console.error('login user module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    userById = async (id: string) => {
        try {
            const user = await UserModel.findById(id)

            if (!user) {
                return {
                    status: false,
                    error: 'Sorry, user not found'
                }
            }

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

export default new _user()