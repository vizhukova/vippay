
exports.up = function(knex, Promise) {
  return knex.schema.table('statistics', function(t){
      t.integer('order_id').references('id').inTable('orders').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('statistics', function(t){
      t.dropColumn('order_id');
  })
};