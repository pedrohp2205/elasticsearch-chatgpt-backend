const elastic = require("../service/elasticsearch")
const openAi = require("../service/openai")

class ChatController {
    async index(request, response) {
        const prompt = request.body.message
        
        const context = await elastic.searchDocument(prompt)

        let answer
        try {
            answer = await openAi.chat.completions.create({
                model: "gpt-4o-mini", 
                messages: [
                  { role: "system", content: "Você é um assistente que responde baseado em dados do Elasticsearch." },
                  { role: "user", content: `Aqui estão os dados do Elasticsearch: \n${context.hits.hits[0]._source}` },
                  { role: "user", content: prompt }
                ],
                max_tokens: 1500, 
            });
        }catch(error){
            return response.json(`Houve um erro com a API da OpenAI \n ${error}`)
        }


        return response.json(answer)
    }
}

module.exports = ChatController