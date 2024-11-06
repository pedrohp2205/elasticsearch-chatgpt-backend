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

    async searchDocumentSimple(query) {
        return await this.client.search({
            index: "tribunal-decisoes-judiciais-tre",
            query: {
                match: {
                    content: query
                }
            }

        })
    }
    

    async searchDocument(query, size = 5) {
        return await this.client.search({
            index: "tribunal-decisoes-judiciais-tre",
            body: {
                query: query,
                highlight: {
                    fields: {
                        content: {
                            fragment_size: 300,
                            number_of_fragments: 20
                        }
                    }
                },
                size: size
            }
        });
    }


    async checkIfDocumentExists(processNumber) {
        const result = await this.client.search({
            index: 'tribunal-decisoes-judiciais-tre',
            size: 1,
            query: {
              bool: {
                must: [{
                    term: {
                        "processNumber.keyword": processNumber
                    }
                }]
              }
            }
        })

        if (result.hits.total.value === 0) {
            return false;
        }
        
        return result.hits.hits[0]._id;
        // return result.hits.total.value > 0;
    }

    async deleteDocument(id) {
        return await this.client.delete({
            index: 'tribunal-decisoes-judiciais-tre',
            id: id
        })
    }
}


module.exports = new ElasticSearch();
