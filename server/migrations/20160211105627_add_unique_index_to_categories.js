
exports.up = function(knex, Promise) {
  return knex.schema.raw('CREATE UNIQUE INDEX category_user_uniq ON categories (user_id, category)')
};

exports.down = function(knex, Promise) {
  
};
