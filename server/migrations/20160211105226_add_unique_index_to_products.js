
exports.up = function(knex, Promise) {
  return knex.schema.raw('CREATE UNIQUE INDEX product_user_uniq ON products (user_id, name)')
};

exports.down = function(knex, Promise) {
  
};
