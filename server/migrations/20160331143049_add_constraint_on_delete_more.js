
exports.up = function(knex, Promise) {
  return knex.schema
    .raw(`ALTER TABLE public."clients-partners"
DROP CONSTRAINT clients_partners_partner_id_foreign;
ALTER TABLE public."clients-partners"
ADD CONSTRAINT clients_partners_partner_id_foreign
FOREIGN KEY (client_id) REFERENCES users (id) ON DELETE CASCADE;`)
    .raw(`ALTER TABLE public."clients-partners"
DROP CONSTRAINT clients_partners_client_id_foreign;
ALTER TABLE public."clients-partners"
ADD CONSTRAINT clients_partners_client_id_foreign
FOREIGN KEY (client_id) REFERENCES users (id) ON DELETE CASCADE;`)
     .raw(`ALTER TABLE public.fee DROP CONSTRAINT fee_client_id_foreign;
ALTER TABLE public.fee
ADD CONSTRAINT fee_client_id_foreign
FOREIGN KEY (client_id) REFERENCES users (id) ON DELETE CASCADE;`)
      .raw(`ALTER TABLE public.fee DROP CONSTRAINT fee_partner_id_foreign;
ALTER TABLE public.fee
ADD CONSTRAINT fee_partner_id_foreign
FOREIGN KEY (partner_id) REFERENCES  users (id) ON DELETE CASCADE;`)
};

exports.down = function(knex, Promise) {
  
};
