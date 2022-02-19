import { model, Schema, Types } from "mongoose";

interface Goal {
    user: Types.ObjectId
    text: string
}

const goalSchema = new Schema<Goal>({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: [true, 'Please add a text value '] }
}, {
    timestamps: true
})


const GoalModel = model('Goal', goalSchema)

export default GoalModel
