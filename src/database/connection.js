/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const knex = require('knex');
const configuration = require('../../knexfile');
const connection = knex(configuration.development);

module.exports = connection;