
exports.up = function(knex, Promise) {
  return knex.schema.table('partner_links', function(t){
      t.increments('id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('partner_links', function(t){
      t.dropColumn('id');
  })
};
