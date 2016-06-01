
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.string('special_login');
  });
};

exports.down = function(knex, Promise) {
};
