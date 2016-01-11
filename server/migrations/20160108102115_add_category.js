
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function(t){
      t.increments('id');
      t.string('category').unique().notNullable();
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
