const express = require('express')
const router = express.Router()
const m$goal = require('../modules/goals.module.js')
const helper = require('../helpers/response')

/**
 * List goal
 */
router.get('/', async (req, res, _next) => {
    const list = await m$goal.listGoal()

    helper.sendResponse(res, list)
})

/**
 * Add goal
 * @param {string} text
 */
router.post('/', async (req, res, _next) => {
    const list = await m$goal.createGoal(req.body)

    helper.sendResponse(res, list)
})

/**
 * Update goal
 * @param {number} id
 * @param {string} text
 */
router.put('/', async (req, res, _next) => {
    const list = await m$goal.updateGoal(req.body)

    helper.sendResponse(res, list)
})

/**
 * Delete Goal by Id
 * @param {number} id id goal
 */
router.delete('/:id', async (req, res, _next) => {
    const list = await m$goal.deleteGoal(req.params.id)

    helper.sendResponse(res, list)
})

module.exports = router

