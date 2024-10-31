const { Router } = require("express");
const multer = require('multer');
const path = require('path');

const DecisionController = require("../controllers/DecisionsController")

const decisionsRoutes = Router();

const decisionsController = new DecisionController();


const upload = multer({
    dest: path.join(__dirname, '../uploads/'),
})

decisionsRoutes.post("/",upload.single('file'),decisionsController.createDecision);
decisionsRoutes.get("/",decisionsController.searchDecision);
decisionsRoutes.delete("/",decisionsController.deleteDecision);




module.exports = decisionsRoutes