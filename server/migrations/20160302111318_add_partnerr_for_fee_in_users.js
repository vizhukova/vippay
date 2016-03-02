
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.enu('partner_fee', ['first', 'last']).defaultTo('last');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.dropColumn('partner_fee');
  })
};