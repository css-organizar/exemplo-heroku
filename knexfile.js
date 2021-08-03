require('dotenv').config();

// Update with your config settings.

// module.exports = 

module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './src/database/db.sqlite'
  //   },
  //   migrations:{
  //     directory: './src/database/migrations'
  //   },
  //   useNullAsDefault: true,
  // },

  // development: {
  //   client: 'pg',
  //   connection: {
  //     url: process.env.DATABASE_URL,
  //     charset: 'utf8',
  //   },
  // },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // staging: {
  //   client: 'pg',
  //   connection: {
  //     url: process.env.DATABASE_URL,
  //     charset: 'utf8',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations:{
  //     directory: './src/database/migrations'
  //   },
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

  production: {
    client: 'pg',
    debug: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/database/migrations'
    },
    ssl: false
  },

};
