
exports.up = function(knex, Promise) {
  return knex.schema.table('categories', function(t){
      t.string('user_id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('categories', function(t){
      t.dropColumn('user_id');
  })
};