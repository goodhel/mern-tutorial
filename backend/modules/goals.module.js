const Goal = require('../models/goalModel')
const User = require('../models/userModel')

class _goals {
    listGoal = async (id) => {
        try {
            const goals = await Goal.find({user: id})

            return {
                status: true,
                data: goals
            }
        } catch (error) {
            return {
                status: false,
                error
            }
        }
    }

    createGoal = async (body) => {
        try {
            const create = await Goal.create({
                text: body.text,
                user: body.id
            })

            return {
                status: true,
                code: 201,
                data: create
            }
        } catch (error) {
            console.error('createGoal goals module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    updateGoal = async (body) => {
        try {
            const goal = await Goal.findById(body.id)

            if (!goal) {
                return {
                    status: false,
                    error: 'Sorry, goal not found'
                }
            }

            const user = await User.findById(body.user)

            if (!user) {
                return {
                    status: false,
                    error: 'Sorry, user not found'
                }
            }

            // Make sure the logged in user match with goal user
            if (goal.user.toString() !== user.id) {
                return {
                    status: false,
                    code: 401,
                    error: 'User not authorized to edit this goal'
                }
            }

            const updateGoal = await Goal.findByIdAndUpdate(body.id, body, {new: true})

            return {
                status: true,
                data: updateGoal
            }
        } catch (error) {
            console.error('updateGoal goals module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteGoal = async (id, userId) => {
        try {
            // const goal = await Goal.deleteOne({id})
            const goal = await Goal.findById(id)

            if (!goal) {
                return {
                    status: false,
                    error: 'Sorry, goal not found'
                }
            }

            const user = await User.findById(userId)

            if (!user) {
                return {
                    status: false,
                    error: 'Sorry, user not found'
                }
            }

            // Make sure the logged in user match with goal user
            if (goal.user.toString() !== user.id) {
                return {
                    status: false,
                    code: 401,
                    error: 'User not authorized to edit this goal'
                }
            }

            await goal.remove()

            return {
                status: true,
                data: goal
            }
        } catch (error) {
            console.error('deleteGoal goals module Error ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _goals()