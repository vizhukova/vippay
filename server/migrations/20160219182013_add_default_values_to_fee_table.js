exports.up = function(knex, Promise) {
    return knex.schema
    .raw("ALTER TABLE fee ALTER COLUMN fee_added SET default 0::NUMERIC")
    .raw("ALTER TABLE fee ALTER COLUMN fee_payed SET default 0::NUMERIC")
};

exports.down = function(knex, Promise) {

};