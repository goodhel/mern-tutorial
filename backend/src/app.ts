import express, { NextFunction, Request, Response } from "express"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { routes } from "./routes"
import connectDB from "./helpers/database"

connectDB()

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req: Request, res: Response, _next: NextFunction) => {
    res.status(200).send({ data: 'Hello this is API From Mern Tutorial' })
})

routes(app)

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
