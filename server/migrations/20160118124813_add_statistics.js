
exports.up = function(knex, Promise) {
  return knex.schema.createTable('statistics', function(t){
      t.increments('id');
      t.integer('customer_id').notNullable().references('id').inTable('customers').onDelete('RESTRICT');
      t.integer('partner_id').references('id').inTable('users').onDelete('RESTRICT');
      t.integer('client_id').notNullable().references('id').inTable('users').onDelete('RESTRICT');
      t.integer('product_id').references('id').inTable('products').onDelete('SET NULL');
      t.enu('action', ['follow_link', 'start_order', 'pending_order', 'complete_order']);
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('statistics');
};
