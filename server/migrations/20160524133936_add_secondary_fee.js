
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){

      t.decimal('fee_secondary').defaultTo(5);

  })
};

exports.down = function(knex, Promise) {
  
};
