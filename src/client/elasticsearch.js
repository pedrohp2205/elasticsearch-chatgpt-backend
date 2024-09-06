const { Client } = require('@elastic/elasticsearch')

function getClient() {
    const client = new Client({
        node: 'https://localhost:9200',
        log: 'trace',
        auth: {
            username: 'elastic',  
            password: 'oBmb9AH9KvI6t7vi4woD',  
        },
        tls: {
            rejectUnauthorized: false, 
        }
    });

    return client;
}

module.exports = getClient;
