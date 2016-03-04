
exports.up = function(knex, Promise) {
  return knex.schema
    .raw(`ALTER TABLE public.acl DROP CONSTRAINT acl_staff_id_foreign`)
    .raw(`ALTER TABLE public.acl
            ADD CONSTRAINT acl_staff_id_foreign
            FOREIGN KEY (staff_id) REFERENCES staff (id) ON DELETE CASCADE`)
};

exports.down = function(knex, Promise) {
  
};
