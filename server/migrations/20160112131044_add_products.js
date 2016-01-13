
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(t){
      t.increments('id');
      t.string('name').notNullable();
      t.decimal('price').notNullable();
      t.integer('category_id').notNullable().references('id').inTable('categories').onDelete('RESTRICT');
       t.integer('user_id').notNullable().references('id').inTable('users').onDelete('RESTRICT');
      t.string('product_link').notNullable();
      t.string('image');
      t.string('description');
      t.boolean('active').defaultTo(true);
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
