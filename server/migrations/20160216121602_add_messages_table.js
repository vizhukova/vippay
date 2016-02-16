
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(t){
      t.increments('id');
      t.integer('user_id').notNullable().references('id').inTable('users');
      t.enu('type', ['warning', 'error', 'success', 'info']);
      t.boolean('delivered').defaultTo(false);
      t.text('text');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
