const express = require('express')
const router = express.Router()
const m$user = require('../modules/user.module')
const helper = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

/**
 * Get List all User
 */
router.get('/', userSession, async (req, res, _next) => {
    const list = await m$user.listUser()

    helper.sendResponse(res, list)
})

/**
 * Get user by id session
 * @param {string} id user session
 */
router.get('/user', userSession, async (req, res, _next) => {
    const list = await m$user.userById(req.user.id)

    helper.sendResponse(res, list)
})

/**
 * Add new User
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} phone
 */
router.post('/', userSession, async (req, res, _next) => {
    const create = await m$user.createUser(req.body)

    helper.sendResponse(res, create)
})

/**
 * Edit user
 * @param {string} id user session
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 */
router.put('/', userSession, async (req, res, _next) => {
    const update = await m$user.updateUser({id: req.user.id, ...req.body})

    helper.sendResponse(res, update)
})

/**
 * Delete User
 * @param {string} id id user
 */
router.delete('/:id', userSession, async (req, res, _next) => {
    const del = await m$user.deleteUser(req.params.id)

    helper.sendResponse(res, del)
})

/**
 * Login User
 * @param {string} email
 * @param {string} password
 */
router.post('/login', async (req, res, _next) => {
    const login = await m$user.login(req.body)

    helper.sendResponse(res, login)
})

module.exports = router