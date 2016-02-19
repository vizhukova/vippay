
exports.up = function(knex, Promise) {
   return knex.schema.table('users', function(t){
      t.dropColumn('fee_added');
      t.dropColumn('fee_payed');
  })
};

exports.down = function(knex, Promise) {
  
};
