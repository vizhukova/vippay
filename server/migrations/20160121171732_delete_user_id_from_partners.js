
exports.up = function(knex, Promise) {
  return knex.schema.table('partners', function(t){
      t.dropColumn('client_id');
  })
};

exports.down = function(knex, Promise) {
  
};
