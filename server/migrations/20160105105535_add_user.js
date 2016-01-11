
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.string('name').unique().notNullable();
      t.string('token').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.dropColumn('name');
      t.dropColumn('token');
  })
};