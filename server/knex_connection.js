var config = require('./config');

var knex = require('knex')(config.get('db'));

module.exports = knex;