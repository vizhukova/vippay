
exports.up = function(knex, Promise) {
  return knex.raw(`
  CREATE OR REPLACE FUNCTION convertToBaseCurrency (decimal, int4, int4) RETURNS decimal AS '
    DECLARE
      val ALIAS FOR $1;
      val_client_id ALIAS FOR $2;
      from_val ALIAS FOR $3;
      basic_currency int4;
    BEGIN

    SELECT users.basic_currency INTO basic_currency FROM users WHERE users.id =  val_client_id;



    RETURN  convert(val, val_client_id, from_val, basic_currency);
    END;
    ' LANGUAGE 'plpgsql';
  `)
};

exports.down = function(knex, Promise) {
  
};
