
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.string('package_id');
  });
};

exports.down = function(knex, Promise) {
};
