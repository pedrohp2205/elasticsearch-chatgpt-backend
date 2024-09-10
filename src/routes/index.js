const { Router } = require("express")

const decisionsRouter = require("./decisions.routes")
const chatRouter = require("./chat.routes")

const routes = Router()

routes.use("/decisions", decisionsRouter)
routes.use("/chat", chatRouter)


module.exports = routes;