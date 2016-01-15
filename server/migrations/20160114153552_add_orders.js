
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function(t){
      t.increments('id');
      t.json('history', true);
      t.integer('customer_id').notNullable().references('id').inTable('customers').onDelete('RESTRICT');
      t.integer('partner_id').references('id').inTable('partners').onDelete('RESTRICT');
      t.integer('client_id').notNullable().references('id').inTable('users').onDelete('RESTRICT');
      t.integer('product_id').references('id').inTable('products').onDelete('SET NULL');
      t.json('product', true).notNullable();
      t.enu('step', ['pending', 'complete', 'leaving']);
      t.decimal('partners_fee');
      t.integer('partner_percent');
      t.integer('number');
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
