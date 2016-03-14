
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.string('method');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.dropColumn('method');
  })
};