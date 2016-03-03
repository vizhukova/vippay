
exports.up = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE staff ALTER COLUMN email TYPE citext')
                    .raw('ALTER TABLE staff ALTER COLUMN login TYPE citext')
};

exports.down = function(knex, Promise) {
  
};
