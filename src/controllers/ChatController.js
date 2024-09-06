const getClient = require("../client/elasticsearch")

class ChatController {
    async index(req, res) {
        const client = getClient();

        client.index({
            index: 'person',
            body: {
                "name": req.body.name,
                "email": req.body.mail,
                "age": req.body.age,
            }
        })
        .then(() => {
            return res.json({ "message": "Pessoar criada com sucesso!" })
        }).catch(err => {
            return res.status(500).json({ "message": err })
        })
        
    }
}

module.exports = ChatController;
