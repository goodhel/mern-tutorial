import mongoose from 'mongoose'
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-tutorial'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url)

        console.log(`MongoDB database connected on ${conn.connection.host}`)
    } catch (error) {
        console.error('connectDB database helper Error ', error)
        process.exit(1)
    }
}

export default connectDB