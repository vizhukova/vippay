
exports.up = function(knex, Promise) {
  return knex.schema.table('categories', function(t){
      t.dropColumn('user_id');
  })
};

exports.down = function(knex, Promise) {
  
};
