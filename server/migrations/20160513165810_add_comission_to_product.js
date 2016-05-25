
exports.up = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.decimal('fee')
  })
};

exports.down = function(knex, Promise) {
  
};
