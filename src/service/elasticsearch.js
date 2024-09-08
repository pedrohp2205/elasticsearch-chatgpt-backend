const { Client } = require('@elastic/elasticsearch')

class ElasticSearch {
    constructor() {
        this.client = new Client({
            node: 'http://localhost:9200',
        });
    }

    async createIndex() {
        await this.client.indices.create({
            index: 'tribunal-decisoes-judiciais-tre'
        }, {ignore: [400]});
    }

    async createDocument(id, document) {
        await this.client.index({
            index: "tribunal-decisoes-judiciais-tre",
            id,
            document
        })
    }

    async searchDocument(query) {
        return await this.client.search({
            index: "tribunal-decisoes-judiciais-tre",
            query: {
                match: {
                    content: query
                }
            }

        })
    }
}


module.exports = new ElasticSearch();
