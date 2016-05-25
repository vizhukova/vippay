
exports.up = function(knex, Promise) {

     return knex.schema
    .raw(`ALTER TABLE public.partner_links DROP CONSTRAINT partner_links_user_id_foreign;
ALTER TABLE public.partner_links
ADD CONSTRAINT partner_links_user_id_foreign
FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;`)

};

exports.down = function(knex, Promise) {
  
};
