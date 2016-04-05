
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.dropColumn('product_id');
  })
};

exports.down = function(knex, Promise) {
  
};
