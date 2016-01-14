
exports.up = function(knex, Promise) {
  return knex.schema.createTable('customers', function(t){
      t.increments('id');
      t.specificType('partner_id', 'text[]');
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
