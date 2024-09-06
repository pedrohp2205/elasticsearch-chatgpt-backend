const { Client } = require('@elastic/elasticsearch')

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



// client.info()
//   .then(response => console.log(response))
//   .catch(error => console.error(error))

module.exports = client;
