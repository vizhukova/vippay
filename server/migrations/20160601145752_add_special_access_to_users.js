
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){

      t.boolean('special_access').defaultTo(false);

  })
};

exports.down = function(knex, Promise) {
  
};
