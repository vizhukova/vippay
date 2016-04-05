
exports.up = function(knex, Promise) {
  return knex.schema.table('baskets', function(t){
      t.integer('client_id').notNullable().references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('baskets', function(t){
      t.dropColumn('client_id');
  })
};