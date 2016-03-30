
exports.up = function(knex, Promise) {
  return knex.schema
      .raw(`ALTER TABLE public.rate
DROP CONSTRAINT rate_client_id_foreign
ADD CONSTRAINT rate_client_id_foreign
FOREIGN KEY (client_id) REFERENCES  () ON DELETE CASCADE;`)
    .raw(`ALTER TABLE public.baskets DROP CONSTRAINT baskets_client_id_foreign;
ALTER TABLE public.baskets
ADD CONSTRAINT baskets_client_id_foreign
FOREIGN KEY (client_id) REFERENCES users (id) ON DELETE CASCADE;`)
    .raw(`ALTER TABLE public.orders DROP CONSTRAINT orders_client_id_foreign;
ALTER TABLE public.orders
ADD CONSTRAINT orders_client_id_foreign
FOREIGN KEY (client_id) REFERENCES users (id) ON DELETE CASCADE;`)
    .raw(`ALTER TABLE public.products DROP CONSTRAINT products_user_id_foreign;
ALTER TABLE public.products
ADD CONSTRAINT products_user_id_foreign
FOREIGN KEY (user_id) REFERENCES  () ON DELETE CASCADE;`)
    .raw(`ALTER TABLE public.categories DROP CONSTRAINT categories_user_id_foreign;
ALTER TABLE public.categories
ADD CONSTRAINT categories_user_id_foreign
FOREIGN KEY ("user_id") REFERENCES  () ON DELETE CASCADE;`)
    .raw(`ALTER TABLE public.promo DROP CONSTRAINT promo_client_id_foreign;
ALTER TABLE public.promo
ADD CONSTRAINT promo_client_id_foreign
FOREIGN KEY (client_id) REFERENCES  () ON DELETE CASCADE;`)
    .raw(`ALTER TABLE public.statistics
ADD CONSTRAINT statistics_client_id_foreign
FOREIGN KEY (client_id) REFERENCES  () ON DELETE CASCADE;`)

};

exports.down = function(knex, Promise) {
  
};
