
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rate', function(t){
      t.increments('id');
      t.integer('from').notNullable().references('id').inTable('currency');
      t.integer('to').notNullable().references('id').inTable('currency');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rate');
};
