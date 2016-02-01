
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t){
      t.increments('id');
      t.string('login').unique().notNullable();
      t.string('email').unique().notNullable();
      t.string('password').notNullable();
      t.enu('type', ['client', 'partner']);
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
