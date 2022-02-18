import { NextFunction, Request, Response, Router } from "express";
import response from "../helpers/response";
import m$user from "../modules/user.module";
import userSession from "../helpers/middleware";

export const UserController = Router()

/**
 * Login User
 * @param {string} email
 * @param {string} password
 */
UserController.post('/login', async (req: Request, res: Response, _next: NextFunction) => {
    const login = await m$user.login(req.body)

    response.sendResponse(res, login)
})

/**
 * Add new User
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} phone
 */
UserController.post('/', async (req: Request, res: Response, _next: NextFunction) => {
    const insert = await m$user.createUser(req.body)

    response.sendResponse(res, insert)
})

/**
 * Edit User
 * @param {string} id
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} phone
 */
UserController.put('/', userSession, async (req: Request, res: Response, _next: NextFunction) => {
    const update = await m$user.updateUser({ id: req.user.i, ...req.body })

    response.sendResponse(res, update)
})

/**
 * Delete User
 * @param {string} id
 */
UserController.delete('/:id', userSession, async (req: Request, res: Response, _next: NextFunction) => {
    const update = await m$user.deleteUser(req.params.id)

    response.sendResponse(res, update)
})

/**
 * Get User by Id
 * @param {string} id id user from session
 */
UserController.get('/me', userSession, async (req: Request, res: Response, _next: NextFunction) => {
    const user = await m$user.userById(req.user.i)

    response.sendResponse(res, user)
})

/**
 * List All User
 */
UserController.get('/', userSession, async (req: Request, res: Response, _next: NextFunction) => {
    const list = await m$user.listUser()

    response.sendResponse(res, list)
})
