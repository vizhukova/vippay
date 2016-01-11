exports.up = function(knex, Promise) {
    return knex.schema
    .raw("ALTER TABLE users DROP CONSTRAINT users_name_unique;")
};

exports.down = function(knex, Promise) {

};