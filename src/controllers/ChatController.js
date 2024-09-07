const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const deleteFolder = require("../utils/DeleteFolder")

class ChatController {

    async createDecision(request, response) {

        if (!request.file) {
            return response.status(400).send('Nenhum arquivo foi enviado.');
        }

        const filePath = path.resolve(__dirname, "..","uploads", request.file.filename);

        if (request.file.mimetype != "application/pdf") {
            deleteFolder(filePath)
            return response.status(400).send('O arquivo enviado deve ser um pdf.');
        }

        const readFile = fs.readFileSync(filePath);
        const data = await pdfParse(readFile);

        deleteFolder(filePath)


        
        response.json(data.text);
    }
}

module.exports = ChatController;
