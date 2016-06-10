
exports.seed = function(knex, Promise) {

   var payment = [{
     name: 'card',
     value: ''
   },{
     name: 'yandex',
     value: ''
   }];


  return Promise.join(

    knex('users')
      .select('*').where('type', '=', 'partner').then((u) => {

      var users = u.filter((item) => !item.payment || !item.payment.length);

      return Promise.map(users, (user) => {
        return knex('users')
            .update({payment: JSON.stringify(payment)})
            .where({id: user.id});
      })
    })

  )
};
