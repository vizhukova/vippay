
exports.up = function(knex, Promise) {
  return knex.schema
   .raw('CREATE UNIQUE INDEX staff_login_uniq ON staff (client_id, login)')
   .raw('CREATE UNIQUE INDEX staff_email_uniq ON staff (client_id, email)')
};

exports.down = function(knex, Promise) {
  
};
