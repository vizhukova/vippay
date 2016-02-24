
exports.up = function(knex, Promise) {
    return knex.schema.raw('CREATE UNIQUE INDEX link_uniq ON partner_links (user_id, key)')
    .raw('ALTER TABLE partner_links DROP CONSTRAINT partner_links_pkey')
};

exports.down = function(knex, Promise) {
  
};
