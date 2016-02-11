
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.decimal('product_price_order_rate').notNullable().defaultTo(0);
      t.decimal('product_price_base_rate').notNullable().defaultTo(0);
      t.decimal('delivery_price_order_rate').notNullable().defaultTo(0);
      t.decimal('delivery_price_base_rate').notNullable().defaultTo(0);
      t.decimal('total_price_order_rate').notNullable().defaultTo(0);
      t.decimal('total_price_base_rate').notNullable().defaultTo(0);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('orders', function(t){
      t.dropColumn('product_price_order_rate');
      t.dropColumn('product_price_base_rate');
      t.dropColumn('delivery_price_order_rate');
      t.dropColumn('delivery_price_base_rate');
      t.dropColumn('total_price_order_rate');
      t.dropColumn('total_price_base_rate');

  });
};
