

exports.seed = function(knex, Promise) {

  return knex(`clients-partners`)
      .select('users.fee as default_fee', 'clients-partners.fee as old_fee', 'clients-partners.partner_id as partner_id', 'clients-partners.client_id as client_id')
      .join('users', 'users.id', 'clients-partners.client_id')
      .where({'users.type': 'client'})
      .then((data) => {

          return Promise.map(data, (item) => {

              return knex(`clients-partners`)
              .update({fee: item.default_fee})
              .where({
                  client_id: item.client_id,
                  partner_id: item.partner_id
              })
                  .whereNull('fee')
              .orWhere({'fee': 0})
          })
      })
};
