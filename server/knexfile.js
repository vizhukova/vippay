var config = require('./config');

module.exports = {

  development: config.get('db'),

  staging: config.get('db'),

  production: config.get('db')

};
