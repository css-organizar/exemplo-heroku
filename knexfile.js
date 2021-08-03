// Update with your config settings.

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
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 0,
      max: 15
    },
    // connection: {
    //   connectionString: process.env.DATABASE_URL,
    //   ssl: { rejectUnauthorized: false },
    // },
    migrations: {
      directory: "./src/database/migrations",
    },
    // seeds: {
    //   directory: __dirname + "/db/seeds",
    // },
  },

};
