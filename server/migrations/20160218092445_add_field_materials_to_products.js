
exports.up = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.json('materials', true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.dropColumn('materials');
  })
};
