
exports.up = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.boolean('available').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.dropColumn('available');
  })
};