
exports.up = function(knex, Promise) {
  return knex.schema.table('currency', function(t){
      t.dropColumn('basic');
  })
};

exports.down = function(knex, Promise) {
  
};
