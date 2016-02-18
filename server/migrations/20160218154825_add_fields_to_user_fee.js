
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.decimal('fee').defaultTo(20).notNullable();
      t.boolean('fee_added').defaultTo(false);
      t.boolean('fee_payed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.dropColumn('fee');
      t.dropColumn('fee_added');
      t.dropColumn('fee_payed');
  })
};