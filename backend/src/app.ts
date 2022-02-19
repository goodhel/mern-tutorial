import express, { NextFunction, Request, Response } from "express"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { routes } from "./routes"
import connectDB from "./helpers/database"
import path from 'path'

connectDB()

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// app.get('/', async (req: Request, res: Response, _next: NextFunction) => {
//     res.status(200).send({ data: 'Hello this is API From Mern Tutorial' })
// })

routes(app)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/build')))

    app.get('*', (req: Request, res: Response) => 
        res.sendFile(
            path.resolve(__dirname, '../', '../', 'frontend', 'build', 'index.html')
        )
    )
} else {
    app.get('/', (req: Request, res: Response) => res.send('Please set to production'))
}

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
