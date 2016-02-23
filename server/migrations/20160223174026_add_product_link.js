
exports.up = function(knex, Promise) {
  return knex.schema.createTable('partner_links', function(t){
      t.string('name').notNullable();
      t.integer('user_id').notNullable().references('id').inTable('users').onDelete('RESTRICT');
      t.string('link').notNullable();
      t.string('key').notNullable();
      t.json('materials', true);
      t.string('description');
      t.boolean('active').default(true);
      t.primary(['user_id', 'key']);
      t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('partner_links');
};
