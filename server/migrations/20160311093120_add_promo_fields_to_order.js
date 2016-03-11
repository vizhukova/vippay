
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.boolean('isPromo').notNullable().defaultTo('false');
      t.string('promo_code');
      t.decimal('discount').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function(t){
      t.dropColumn('isPromo');
      t.dropColumn('promo_code');
      t.dropColumn('discount');
  })
};