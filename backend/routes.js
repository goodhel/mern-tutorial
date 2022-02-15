const GoalsController = require('./controllers/GoalsController')

const _routes = [
    ['goals', GoalsController]
]

const routes = (app) => {
    _routes.forEach((route) => {
        const [url, controller] = route
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes