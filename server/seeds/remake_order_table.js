
exports.seed = function(knex, Promise) {
  return knex('orders')
    .select('*')
    .then((orders) => {
      return Promise.map(orders, (order) => {
        var product =  order.product instanceof Array ? order.product : [order.product];

        return knex('orders')
            .update({product: JSON.stringify(product)})
            .where({id: order.id})
        })
    })
};
