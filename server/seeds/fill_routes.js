
exports.seed = function(knex, Promise) {
  return Promise.join(

    knex('routes').insert({route: 'product', entity: 'catalog'}),
    knex('routes').insert({route: 'category', entity: 'catalog'}),
    knex('routes').insert({route: 'partner', entity: 'partner'}),
    knex('routes').insert({route: 'partnerlinks', entity: 'partner_links'}),
    knex('routes').insert({route: 'order', entity: 'order'}),
    knex('routes').insert({route: 'rate', entity: 'rate'}),
    knex('routes').insert({route: 'basicCurrency', entity: 'rate'}),
    knex('routes').insert({route: 'fee', entity: 'fee'}),
    knex('routes').insert({route: 'payments', entity: 'payments'}),
    knex('routes').insert({route: 'promo', entity: 'promo'})
  );
};
