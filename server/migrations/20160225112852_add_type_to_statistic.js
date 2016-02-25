
exports.up = function(knex, Promise) {
  return knex.schema.table('statistics', function(t){
       t.enu('type', ['product', 'link']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('statistics', function(t){
      t.dropColumn('type');
  })
};
