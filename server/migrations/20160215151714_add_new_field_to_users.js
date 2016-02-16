
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.enu('tariff_duration', ['3', '6', '12']);
      t.enu('tariff_name', ['start', 'business', 'magnate']);
      t.timestamp('tariff_date');
      t.boolean('tariff_payed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
      t.dropColumn('tariff_payed');
      t.dropColumn('tariff_duration');
      t.dropColumn('tariff_name');
      t.dropColumn('tariff_date');
  })
};