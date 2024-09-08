const { Router } = require("express");
const multer = require('multer');
const path = require('path');
const ChatController = require("../controllers/ChatController")

const chatRoutes = Router();

const chatController = new ChatController();


const upload = multer({
    dest: path.join(__dirname, '../uploads/'),
})

chatRoutes.post("/",upload.single('file'),chatController.createDecision);
chatRoutes.get("/search",chatController.searchDecision);




module.exports = chatRoutes