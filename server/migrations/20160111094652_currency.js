
exports.up = function(knex, Promise) {
  return knex.schema.createTable('currency', function(t){
      t.increments('id');
      t.string('name').notNullable();
      t.integer('code');
      t.boolean('basic').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('currency');
};
