const express = require('express')
const router = express.Router()
const m$goal = require('../modules/goals.module.js')
const helper = require('../helpers/response')
const { userSession } = require('../helpers/middleware')

/**
 * List goal
 */
router.get('/', userSession, async (req, res, _next) => {
    const list = await m$goal.listGoal(req.user.id)

    helper.sendResponse(res, list)
})

/**
 * Add goal
 * @param {string} text
 */
router.post('/', userSession, async (req, res, _next) => {
    const list = await m$goal.createGoal({id: req.user.id, ...req.body})

    helper.sendResponse(res, list)
})

/**
 * Update goal
 * @param {number} id
 * @param {string} text
 */
router.put('/', userSession, async (req, res, _next) => {
    const list = await m$goal.updateGoal({user: req.user.id, ...req.body})

    helper.sendResponse(res, list)
})

/**
 * Delete Goal by Id
 * @param {number} id id goal
 */
router.delete('/:id', userSession, async (req, res, _next) => {
    const list = await m$goal.deleteGoal(req.params.id, req.user.id)

    helper.sendResponse(res, list)
})

module.exports = router

