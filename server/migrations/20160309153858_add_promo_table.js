
exports.up = function(knex, Promise) {
  return knex.schema.createTable('promo', function(t){
      t.increments('id');
      t.decimal('discount').notNullable();
      t.timestamp('date');
      t.string('code').notNullable();
      t.integer('client_id').notNullable().references('id').inTable('users');
  }).raw('CREATE UNIQUE INDEX promo_code_uniq ON promo (client_id, code)');
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('promo');
};
