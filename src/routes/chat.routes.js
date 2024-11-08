const { Router } = require("express");


const ChatController = require("../controllers/ChatController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const chatRoutes = Router();

const chatController = new ChatController();



chatRoutes.post("/",ensureAuthenticated,chatController.index);




module.exports = chatRoutes