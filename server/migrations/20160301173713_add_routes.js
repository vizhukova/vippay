
exports.up = function(knex, Promise) {
  return knex.schema.createTable('routes', function(t){
      t.increments('id');
      t.string('route').notNullable();
      t.string('entity').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('routes');
};
