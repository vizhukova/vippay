var config = require('./config');

var knex = require('knex')(config.get('db'));

module.exports = require('bookshelf')(knex);
