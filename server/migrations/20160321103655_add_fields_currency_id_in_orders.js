
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.integer('basic_currency').notNullable().references('id').inTable('currency').defaultTo(4);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('baskets', function(t){
      t.dropColumn('basic_currency');
  })
};