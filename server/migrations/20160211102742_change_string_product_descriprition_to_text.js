
exports.up = function(knex, Promise) {
  return knex.schema
    .raw("ALTER TABLE products ALTER COLUMN description TYPE text;")
};

exports.down = function(knex, Promise) {

};
