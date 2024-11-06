const elastic = require("../service/elasticsearch")
const openAi = require("../service/openai")
const searchRelevantText = require("../utils/SearchRelevantText")


class ChatController {
    async index(request, response) {
        const prompt = request.body.message
        

        
        const context = await searchRelevantText(prompt)

        let answer
        try {
            answer = await openAi.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Você é um assistente que responde baseado em dados do Elasticsearch." },
                    { role: "user", content: `Aqui está a pergunta do usuário: ${prompt}` },
                    { role: "system", content: `Aqui estão os dados do Elasticsearch: \n${context}` },
                    // { role: "system", content: `Aqui estão os dados do Elasticsearch: \n${context.hits.hits[0]._source.content}` },
                    { role: "user", content: prompt }
                ],
                max_tokens: 1000, 
            });
        }catch(error){
            return response.json(`Houve um erro com a API da OpenAI \n ${error}`)
        }


        return response.json(answer.choices[0].message.content)
    }
}

module.exports = ChatController