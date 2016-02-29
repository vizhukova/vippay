
exports.up = function(knex, Promise) {
  return knex.schema.createTable('staff', function(t){
      t.increments('id');
      t.string('login').notNullable();
      t.string('email').notNullable();
      t.string('password').notNullable();
      t.string('role');
      t.boolean('active').defaultTo(true);
      t.integer('client_id').references('id').inTable('users').onDelete('RESTRICT').notNullable();
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('staff');
};
