require('dotenv').config();

module.exports = {

    development: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './src/database/migrations'
        }
    },

    staging: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './src/database/migrations'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './src/database/migrations'
        }
    }

};