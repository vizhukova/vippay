
exports.up = function(knex, Promise) {
  return knex.schema.createTable('baskets_products', function(t){
      t.increments('id');
      t.integer('basket_id').notNullable().references('id').inTable('baskets');
      t.json('product').notNullable();
      t.integer('quantity').defaultTo(1);
      t.decimal('price_per_unit').defaultTo(0);
      t.decimal('total_price').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('baskets_products');
};
