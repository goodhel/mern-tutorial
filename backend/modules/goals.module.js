const Goal = require('../models/goalModel')

class _goals {
    listGoal = async () => {
        try {
            const goals = await Goal.find()

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
                text: body.text
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

    deleteGoal = async (id) => {
        try {
            const goal = await Goal.deleteOne({id})

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