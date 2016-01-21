
exports.up = function(knex, Promise) {
  return knex.schema.table('statistics', function(t){
      t.integer('order_id').notNullable().references('id').inTable('orders');
      t.dropColumn('product_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('statistics', function(t){
      t.dropColumn('order_id');
  })
};
