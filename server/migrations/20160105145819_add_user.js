
exports.up = function(knex, Promise) {
    return knex.schema
    .raw("ALTER TABLE users ALTER COLUMN token DROP NOT NULL;")
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.dropColumn('token');
  })
};