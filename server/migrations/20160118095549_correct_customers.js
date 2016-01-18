
exports.up = function(knex, Promise) {
  return knex.schema.table('customers', function(t){
      t.dropColumn('partner_id');
  });
};

exports.down = function(knex, Promise) {

};
