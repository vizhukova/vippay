
exports.up = function(knex, Promise) {
  return knex.schema.table('partners', function(t){
      t.boolean('active').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('partners', function(t){
      t.dropColumn('active');
  })
};