
exports.up = function(knex, Promise) {
  return knex.schema.createTable('acl', function(t){
      t.increments('id');
      t.string('route').notNullable();
      t.enu('action', ['read', 'write']);
      t.integer('staff_id').references('id').inTable('staff').onDelete('RESTRICT').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('acl');
};
