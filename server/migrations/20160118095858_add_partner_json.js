
exports.up = function(knex, Promise) {
  return knex.schema.table('customers', function(t){
      t.json('partner_product_id', true).notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('customers', function(t){
      t.dropColumn('partner_product_id');
  });
};
