
exports.up = function(knex, Promise) {
  return knex.schema.table('fee', function(t){
      t.integer('partner_id').notNullable().references('id').inTable('users').onDelete('RESTRICT');
      t.decimal('fee_added');
      t.decimal('fee_payed');
      t.dropColumn('id');
      t.dropColumn('value');
      t.primary(['partner_id', 'client_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('fee', function(t){
      t.dropColumn('partner_id');
      t.dropColumn('fee_added');
      t.dropColumn('fee_payed');
  })
};