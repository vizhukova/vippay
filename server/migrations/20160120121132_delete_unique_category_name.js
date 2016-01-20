exports.up = function(knex, Promise) {
    return knex.schema
    .raw("ALTER TABLE categories DROP CONSTRAINT categories_category_unique;")
};

exports.down = function(knex, Promise) {

};