import express, { NextFunction, Request, Response } from 'express'
import m$goal from "../modules/goal.module";
import response from '../helpers/response';
import userSession from '../helpers/middleware';

export const GoalController = express.Router()

/**
 * List Goal
 * @param {string} id id user from session
 */
GoalController.get('/', userSession, async (req: Request, res: Response, _next: NextFunction) => {
    const list = await m$goal.listGoal(req.user.i)

    response.sendResponse(res, list)    
})

/**
 * Add goal
 * @param {string} text
 */
 GoalController.post('/', userSession, async (req, res, _next) => {
    const list = await m$goal.createGoal({id: req.user.i, ...req.body})

    response.sendResponse(res, list)
})

/**
 * Update goal
 * @param {number} id
 * @param {string} text
 */
GoalController.put('/', userSession, async (req, res, _next) => {
    const list = await m$goal.updateGoal({user: req.user.i, ...req.body})

    response.sendResponse(res, list)
})

/**
 * Delete Goal by Id
 * @param {number} id id goal
 */
GoalController.delete('/:id', userSession, async (req, res, _next) => {
    const list = await m$goal.deleteGoal(req.params.id, req.user.i)

    response.sendResponse(res, list)
})
