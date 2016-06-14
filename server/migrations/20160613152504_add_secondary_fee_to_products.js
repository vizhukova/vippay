
exports.up = function(knex, Promise) {
  return knex.schema.table('products', function(t){

      t.decimal('fee_secondary');

  })
};

exports.down = function(knex, Promise) {
  
};
