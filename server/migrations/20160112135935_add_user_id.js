
exports.up = function(knex, Promise) {
  return knex.schema.table('categories', function(t){
      t.integer('user_id').notNullable().references('id').inTable('users').onDelete('RESTRICT');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('categories', function(t){
      t.dropColumn('user_id');
  })
};
