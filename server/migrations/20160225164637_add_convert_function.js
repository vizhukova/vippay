
exports.up = function(knex, Promise) {
  return knex.raw(`
   CREATE OR REPLACE FUNCTION convert (decimal, int4, int4, int4) RETURNS decimal AS '
    DECLARE
      val ALIAS FOR $1;
      val_client_id ALIAS FOR $2;
      from_val ALIAS FOR $3;
      to_val ALIAS FOR $4;
      val_result decimal;
    BEGIN
    IF (from_val = to_val) THEN  val_result = 1;
    ELSE SELECT rate."result" INTO val_result FROM rate
                  WHERE rate."client_id" = val_client_id
                  AND rate."from" = from_val
                  AND rate."to" = to_val;
    END IF;

    RETURN  val_result * val;
    END;
    ' LANGUAGE 'plpgsql';
  `);
};

exports.down = function(knex, Promise) {
  
};
