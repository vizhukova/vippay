var knex = require('./../test_knex_connection');

exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('currency').del(),

    knex('currency').insert({id: 1, colName: 'UAH'}),
    knex('currency').insert({id: 2, colName: 'USD'}),
    knex('currency').insert({id: 3, colName: 'EUR'}),
    knex('currency').insert({id: 4, colName: 'RUB'})
  );
};
