import { model, Schema } from "mongoose"

interface User {
    name: string
    email: string
    password: string
    phone: string
}

const userSchema = new Schema({
    name: { type: String, required: [true, 'Please add a name']},
    email: { type: String, required: [true, 'Please add a email']},
    password: { type: String, required: [true, 'Please add a password']},
    phone: { type: String },
})

const UserModel = model('User', userSchema)

export default UserModel