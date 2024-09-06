const { Router } = require("express")

const chatRouter = require("./chat.routes")

const routes = Router()

routes.use("/chat", chatRouter)


module.exports = routes;