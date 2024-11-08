const path = require("path")
require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],

    pool: {
        afterCreate: (conn, cb) => {
          conn.query('SET timezone = "UTC";', (err) => {
            cb(err, conn);
          });
        }
      },

    useNullAsDefault: true,

    migrations : {
      directory: path.resolve(__dirname, "src", "database", "migrations")
    }
  },
  
};
