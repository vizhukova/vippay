
exports.up = function(knex, Promise) {
  return knex.schema.table('products', function(t){

      t.boolean('special').defaultTo(false);

  })
};

exports.down = function(knex, Promise) {
  
};
