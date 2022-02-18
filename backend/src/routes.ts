import { Application, Router } from "express";
import { GoalController } from './controllers/GoalController'
import { UserController } from "./controllers/UserController";

const _routes: [string, Router][] = [
    ['goal', GoalController],
    ['user', UserController]
]

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route
        app.use(`/api/${url}`, controller)
    })
}