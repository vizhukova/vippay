
exports.up = function(knex, Promise) {
  return knex.schema.createTable('logs', function(t){
      t.increments('id');
      t.string('data');
      t.enu('type', ['debug', 'warn', 'info', 'error']);
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('logs');
};
