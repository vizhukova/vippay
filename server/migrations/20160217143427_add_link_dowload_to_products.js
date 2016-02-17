
exports.up = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.string('link_download');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('products', function(t){
      t.dropColumn('link_download');
  })
};
