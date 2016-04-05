
exports.up = function(knex, Promise) {
  return knex.schema.table('clients-partners', function(t){
      t.decimal('fee').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('clients-partners', function(t){
      t.dropColumn('fee');
  })
};