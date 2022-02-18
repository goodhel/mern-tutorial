import GoalModel from "../models/goal.model"
import UserModel from "../models/user.model"

interface CreateGoal {
    text: string
    id: string
}

interface UpdateGoal {
    text: string
    id: string
    user: string
}

class _goal {
    listGoal = async (id: string) => {
        try {
            const goal = await GoalModel.find({user: id})

            return {
                status: true,
                data: goal
            }
        } catch (error) {
            console.error('listGoal goal module Error ', error)

            return {
                status: false,
                error
            }
        }
    }

    createGoal = async (body: CreateGoal) => {
        try {
            const create = await GoalModel.create({
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

    updateGoal = async (body: UpdateGoal) => {
        try {
            const goal = await GoalModel.findById(body.id)

            if (!goal) {
                return {
                    status: false,
                    error: 'Sorry, goal not found'
                }
            }

            const user = await UserModel.findById(body.user)

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

            const updateGoal = await GoalModel.findByIdAndUpdate(body.id, body, {new: true})

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

    deleteGoal = async (id: string, userId: string) => {
        try {
            // const goal = await GoalModel.deleteOne({id})
            const goal = await GoalModel.findById(id)

            if (!goal) {
                return {
                    status: false,
                    error: 'Sorry, goal not found'
                }
            }

            const user = await UserModel.findById(userId)

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

export default new _goal()