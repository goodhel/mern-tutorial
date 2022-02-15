const mongoose = require('mongoose')
const url = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        
        console.log(`MongoDb Connected connection ${conn.connection.host}`)
    } catch (error) {
        console.error('connectDB database helper Error ', error)
        process.exit(1)
    }
}

module.exports = connectDB