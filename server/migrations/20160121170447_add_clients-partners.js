
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clients-partners', function(t){
      t.integer('partner_id').notNullable().references('id').inTable('partners').onDelete('RESTRICT');
      t.integer('client_id').notNullable().references('id').inTable('users').onDelete('RESTRICT');
      t.primary(['partner_id', 'client_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clients-partners');
};
