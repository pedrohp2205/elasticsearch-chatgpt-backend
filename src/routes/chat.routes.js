const { Router } = require("express");

const ChatController = require("../controllers/ChatController")

const chatRoutes = Router();

const chatController = new ChatController();

chatRoutes.post("/", chatController.index);

module.exports = chatRoutes