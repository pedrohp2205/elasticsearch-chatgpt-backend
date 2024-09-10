const { Router } = require("express");


const ChatController = require("../controllers/ChatController")

const chatRoutes = Router();

const chatController = new ChatController();

chatRoutes.get("/",chatController.index);




module.exports = chatRoutes