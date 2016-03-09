
exports.up = function(knex, Promise) {
  return knex.schema.createTable('product_promo', function(t){
      t.integer('product_id').notNullable().references('id').inTable('products').onDelete('RESTRICT');
      t.integer('promo_id').notNullable().references('id').inTable('promo').onDelete('RESTRICT');
      t.primary(['product_id', 'promo_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('product_promo');
};
