
exports.up = function(knex, Promise) {
   return knex.schema
    .raw(`ALTER TABLE public.staff DROP CONSTRAINT staff_client_id_foreign;
ALTER TABLE public.staff
ADD CONSTRAINT staff_client_id_foreign
FOREIGN KEY (client_id) REFERENCES users (id) ON DELETE CASCADE;`)
       .raw(`ALTER TABLE public.baskets_products DROP CONSTRAINT baskets_products_basket_id_foreign;
ALTER TABLE public.baskets_products
ADD CONSTRAINT baskets_products_basket_id_foreign
FOREIGN KEY (basket_id) REFERENCES baskets (id) ON DELETE CASCADE;`)
       .raw(`ALTER TABLE public.upsell_product DROP CONSTRAINT upsell_product_upsell_id_foreign;
ALTER TABLE public.upsell_product
ADD CONSTRAINT upsell_product_upsell_id_foreign
FOREIGN KEY (upsell_id) REFERENCES products (id) ON DELETE CASCADE;
ALTER TABLE public.upsell_product DROP CONSTRAINT upsell_product_product_id_foreign;
ALTER TABLE public.upsell_product
ADD CONSTRAINT upsell_product_product_id_foreign
FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;`)
       .raw(`ALTER TABLE public.product_promo DROP CONSTRAINT product_promo_product_id_foreign;
ALTER TABLE public.product_promo
ADD CONSTRAINT product_promo_product_id_foreign
FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;
ALTER TABLE public.product_promo DROP CONSTRAINT product_promo_promo_id_foreign;
ALTER TABLE public.product_promo
ADD CONSTRAINT product_promo_promo_id_foreign
FOREIGN KEY (promo_id) REFERENCES promo (id) ON DELETE CASCADE;`)
};

exports.down = function(knex, Promise) {
  
};
