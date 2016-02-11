
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.integer('basic_currency_id').notNullable().references('id').inTable('currency').defaultTo(1);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('orders', function(t){
      t.dropColumn('basic_currency_id');
  });
};
