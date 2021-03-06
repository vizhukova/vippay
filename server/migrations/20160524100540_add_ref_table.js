
exports.up = function(knex, Promise) {
  return knex.schema.createTable('referers', function(t){

      t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      t.integer('referer_id').references('id').inTable('users').onDelete('CASCADE');
      t.integer('client_id').references('id').inTable('users').onDelete('CASCADE');
      t.primary(['user_id', 'client_id']);

  })
};

exports.down = function(knex, Promise) {
  
};
