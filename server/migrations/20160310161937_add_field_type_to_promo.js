
exports.up = function(knex, Promise) {
  return knex.schema.table('promo', function(t){
      t.enu('type', ['until', 'during']).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('promo', function(t){
      t.dropColumn('type');
  })
};