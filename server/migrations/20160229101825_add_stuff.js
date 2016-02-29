
exports.up = function(knex, Promise) {
  return knex.schema.createTable('staff', function(t){
      t.increments('id');
      t.string('login');
      t.string('email');
      t.string('password');
      t.string('role');
      t.boolean('active');
      t.integer('client_id').references('id').inTable('users').onDelete('RESTRICT').notNullable();
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('staff');
};
