
exports.up = function(knex, Promise) {
  return knex.schema.createTable('baskets', function(t){
      t.increments('id');
      t.integer('customer_id').notNullable().references('id').inTable('customers');
      t.enu('step', ['pending', 'complete', 'leaving']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('baskets');
};
