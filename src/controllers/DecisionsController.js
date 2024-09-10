const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const deleteFolder = require("../utils/DeleteFolder")
const elastic = require("../service/elasticsearch")
const { v4: uuidv4 } = require("uuid")


class DecisionsController {

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

        const processNumberTemplate = /PROCESSO[^\d]*(\d{6}\/\d{4})/g;
        const matchProcessNumber = data.text.match(processNumberTemplate);

        let processNumber 
        if (matchProcessNumber && matchProcessNumber.length > 0) {
            processNumber = matchProcessNumber[0].match(/(\d{6}\/\d{4})/);
            console.log(processNumber ? processNumber[0] : "Número de processo não encontrado.");
        } else {
            console.log("Nenhum número de processo encontrado.");
        }


        deleteFolder(filePath)

        

        if (!matchProcessNumber) {
            return response.status(400).send('Número do processo não encontrado no documento.');
        }

        const uuid = uuidv4()

        elastic.createDocument(uuid, {
            processNumber: processNumber[0],
            content: data.text
        } )
        
        response.json(`Criado documento com o ID: ${uuid} e número de processo ${processNumber[0]}`);
    };

    async searchDecision(request, response) {
        const { contentQuery } = request.query

        const decisions = await elastic.searchDocument(contentQuery)


        return response.json(decisions.hits.hits)
    }
}

module.exports = DecisionsController;
