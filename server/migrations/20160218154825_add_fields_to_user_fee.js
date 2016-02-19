
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.decimal('fee').defaultTo(20).notNullable();
      t.decimal('fee_added');
      t.decimal('fee_payed');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.dropColumn('fee');
      t.dropColumn('fee_added');
      t.dropColumn('fee_payed');
  })
};