
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.integer('basic_currency').notNullable().references('id').inTable('currency');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.dropColumn('basic_currency');
  })
};
