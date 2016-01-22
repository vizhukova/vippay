
exports.up = function(knex, Promise) {
  return knex.schema.table('rate', function(t){
      t.decimal('result', true).notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('rate', function(t){
      t.dropColumn('result');
  });
};
