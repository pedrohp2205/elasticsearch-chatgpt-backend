const { Router } = require("express")

const decisionsRouter = require("./decisions.routes")
const chatRouter = require("./chat.routes")
const usersRouter = require("./users.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()

routes.use("/decisions", decisionsRouter)
routes.use("/chat", chatRouter)
routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)


module.exports = routes;