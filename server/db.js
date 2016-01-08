
var knex = require('./knex_connection')

module.exports = require('bookshelf')(knex);
