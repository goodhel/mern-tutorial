const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./helpers/database')
const routes  = require('./routes')

connectDB()

const app = express()

const port = process.env.PORT || 5001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req, res, next) => {
    res.status(200).send({ data: 'Hello api from express MERN Tutorial'})
})

routes(app)

app.listen(port, () => {
    console.log(`Service listening on http://localhost:${port}`)
})

