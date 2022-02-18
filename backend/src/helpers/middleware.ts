import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/user.model'
const secret = process.env.JWT_SECRET || 'merntutorialscretkey'

interface PayloadUser {
    i: string
    n: string
    e: string
    iat: number
    exp: number
}

const userSession = async (req: Request, res: Response, next: NextFunction) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            
            // Verify Token
            const decoded = jwt.verify(token, secret) as PayloadUser

            // Check user
            const user = await UserModel.findById(decoded.i).select('-password')

            if (!user) {
                res.status(401).send({message: 'Not authorized'})
            }

            req.user = {
                i: user.id,
                n: user.name,
                e: user.email
            }

            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({message: 'Not authorized'})
        }
    }

    if (!token) {
        res.status(401).send({message: 'Not authorized, no token'})
        // throw new Error('Not authorized, no token')
    }
}

export default userSession