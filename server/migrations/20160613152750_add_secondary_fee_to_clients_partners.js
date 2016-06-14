
exports.up = function(knex, Promise) {
  return knex.schema.table('clients-partners', function(t){

      t.decimal('fee_secondary');

  })
};

exports.down = function(knex, Promise) {
  
};
