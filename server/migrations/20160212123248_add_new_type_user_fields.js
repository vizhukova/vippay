
exports.up = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE users ALTER COLUMN email TYPE citext')
                    .raw('ALTER TABLE users ALTER COLUMN login TYPE citext')
};

exports.down = function(knex, Promise) {
  
};
