
exports.up = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.integer('upsell_id').references('id').inTable('products');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.dropColumn('upsell_id');
  })
};