
exports.up = function(knex, Promise) {
  return knex.schema.createTable('partners', function(t){
      t.increments('id');
      t.integer('client_id').references('id').inTable('users').onDelete('RESTRICT').notNullable();
      t.string('login').unique().notNullable();
      t.string('email').unique().notNullable();
      t.string('password').notNullable();
      t.string('name').notNullable();
      t.string('token');
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('partners');
};
