
exports.up = function(knex, Promise) {
  return knex.schema
    .raw(`ALTER TABLE public.baskets_products ALTER COLUMN total_price TYPE NUMERIC(11,2) USING total_price::NUMERIC(12,2);`)
    .raw(`ALTER TABLE public.orders ALTER COLUMN delivery_price_base_rate TYPE NUMERIC(12,2) USING delivery_price_base_rate::NUMERIC(12,2);
ALTER TABLE public.orders ALTER COLUMN total_price_order_rate TYPE NUMERIC(12,2) USING total_price_order_rate::NUMERIC(12,2);`)
};

exports.down = function(knex, Promise) {
  
};
