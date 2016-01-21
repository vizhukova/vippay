
exports.up = function(knex, Promise) {
  return knex.schema.table('statistics', function(t){
      t.json('product', true).notNullable();
      t.dropColumn('order_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('statistics', function(t){
      t.dropColumn('product');
  })
};
