
exports.up = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.decimal('upsell_price');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.dropColumn('upsell_price');
  })
};