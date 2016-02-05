
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.json('payment', true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.dropColumn('payment');
  })
};