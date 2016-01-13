
exports.up = function(knex, Promise) {
  return knex.schema.table('categories', function(t){
      t.boolean('active').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('categories', function(t){
      t.dropColumn('active');
  })
};
