
exports.up = function(knex, Promise) {
  return knex.schema.table('products', function(t){
       t.dropColumn('upsell_price');
       t.dropColumn('upsell_id');
       t.boolean('isUpsell').defaultTo(false);
  }).then(() => {
    return knex.schema.createTable('upsell_product', function(t){
       t.increments('id');
       t.integer('upsell_id').references('id').inTable('products').onDelete('RESTRICT').notNullable();
       t.integer('product_id').references('id').inTable('products').onDelete('RESTRICT').notNullable();
       t.decimal('price').notNullable();
    })
  }).then(() => {
      return knex.schema.raw('CREATE UNIQUE INDEX uniq_upsell_product ON upsell_product (upsell_id, product_id)');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('upsell_product', function(t){
    t.dropColumn('upsell_id');
    t.dropColumn('product_id');
    t.dropColumn('price');
  })
};