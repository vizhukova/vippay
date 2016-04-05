
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bank_rate', function(t){
      t.increments('id');
      t.integer('from').notNullable().references('id').inTable('currency');
      t.integer('to').notNullable().references('id').inTable('currency');
      t.decimal('result').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bank_rate');
};
