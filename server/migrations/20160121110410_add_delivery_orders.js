
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.json('delivery', true).notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('orders', function(t){
      t.dropColumn('delivery');
  });
};
