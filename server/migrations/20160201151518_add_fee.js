
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fee', function(t){
      t.increments('id');
      t.json('value', true);
      t.integer('client_id').notNullable().references('id').inTable('users').onDelete('RESTRICT');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fee');
};
