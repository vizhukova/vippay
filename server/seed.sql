INSERT INTO currency (name) VALUES ('UAH'),
                                    ('USD'),
                                    ('EUR'),
                                    ('RUB');

INSERT INTO users (login, email, password, name, basic_currency, type) VALUES ('client1', 'email1@sss.ss', '1', 'name1', '1', 'client'),
                                                                          ('client2', 'email2@sss.ss', 'password2', 'name2', '1', 'client'),
                                                                          ('login3', 'email3@sss.ss', 'password3', 'name3', '1', 'client'),
                                                                          ('login4', 'email4@sss.ss', 'password4', 'name4', '1', 'client'),
                                                                          ('login5', 'email5@sss.ss', 'password5', 'name5', '1', 'client'),
                                                                          ('login6', 'email6@sss.ss', 'password6', 'name6', '1', 'partner'),
                                                                          ('login7', 'email7@sss.ss', 'password7', 'name7', '1', 'partner'),
                                                                          ('login8', 'email8@sss.ss', 'password8', 'name8', '1', 'partner'),
                                                                          ('login9', 'email9@sss.ss', 'password9', 'name9', '1', 'partner'),
                                                                          ('login10', 'email10@sss.ss', 'password10', 'name10', '1', 'partner'),
                                                                          ('login11', 'email11@sss.ss', 'password11', 'name11', '1', 'partner');


INSERT INTO categories (category, user_id) VALUES ('category1', '1'),
                                                      ('category2', '1'),
                                                      ('category3', '1'),
                                                      ('category4', '2'),
                                                      ('category5', '2'),
                                                      ('category6', '3'),
                                                      ('category7', '4'),
                                                      ('category8', '5'),
                                                      ('category9', '6'),
                                                      ('category10', '6'),
                                                      ('category11', '6');


INSERT INTO products (category_id, user_id, name, price, product_link, image, description, currency_id)
              VALUES ('1', '1', 'product1', '12', 'product_link11', 'image11', 'description11', '1'),
                    ('2', '1', 'product2', '22', 'product_link22', 'image22', 'description2', '1'),
                    ('5', '2', 'product3', '133', 'product_link33', 'image33', 'description33', '2'),
                    ('6', '3', 'product4', '42', 'product_link44', 'image44', 'description44', '1'),
                    ('7', '4', 'product55', '52', 'product_link55', 'image55', 'description55', '3'),
                    ('8', '5', 'product6', '162', 'product_link66', 'image66', 'description66', '1'),
                    ('9', '6', 'product17', '172', 'product_link77', 'image77', 'description77', '1'),
                    ('11', '6', 'product8', '182', 'product_link88', 'image88', 'description88', '3');



INSERT INTO "clients-partners" (client_id, partner_id) VALUES ('1', '6'),
                                                              ('1', '7'),
                                                              ('1', '8'),
                                                              ('1', '9'),
                                                              ('1', '10'),
                                                              ('1', '11'),
                                                              ('2', '6'),
                                                              ('2', '7'),
                                                              ('3', '8'),
                                                              ('3', '9'),
                                                              ('3', '10'),
                                                              ('3', '11'),
                                                              ('4', '6'),
                                                              ('4', '7'),
                                                              ('4', '8'),
                                                              ('5', '9'),
                                                              ('5', '10'),
                                                              ('5', '11');




INSERT INTO customers (partner_product_id) VALUES ('{"product_id": "1", "partner_id": "[6,7]"}'),
                                                  ('{"product_id": "2", "partner_id": "[10,8]"}'),
                                                  ('{"product_id": "3", "partner_id": "[6,11]"}'),
                                                  ('{"product_id": "4", "partner_id": "[11,6]"}'),
                                                  ('{"product_id": "5", "partner_id": "[7,8]"}');

INSERT INTO rate ("from", "to", "result", "client_id") VALUES ('1', '2', '1', '1'),
                                                             ('1', '3', '2', '1'),
                                                             ('1', '4', '3', '1'),
                                                             ('2', '1', '4', '1'),
                                                             ('2', '3', '5', '1'),
                                                             ('2', '4', '6', '1'),
                                                             ('3', '1', '7', '1'),
                                                             ('3', '2', '8', '1'),
                                                             ('3', '4', '9', '1'),
                                                             ('4', '1', '10', '1'),
                                                             ('4', '2', '11', '1'),
                                                             ('4', '3', '12', '1'),
                                                             ('1', '2', '1', '2'),
                                                             ('1', '3', '2', '2'),
                                                             ('1', '4', '3', '2'),
                                                             ('2', '1', '4', '2'),
                                                             ('2', '3', '5', '2'),
                                                             ('2', '4', '6', '2'),
                                                             ('3', '1', '7', '2'),
                                                             ('3', '2', '8', '2'),
                                                             ('3', '4', '9', '2'),
                                                             ('4', '1', '10', '2'),
                                                             ('4', '2', '11', '2'),
                                                             ('4', '3', '12', '2'),
                                                             ('1', '2', '1', '3'),
                                                             ('1', '3', '2', '3'),
                                                             ('1', '4', '3', '3'),
                                                             ('2', '1', '4', '3'),
                                                             ('2', '3', '5', '3'),
                                                             ('2', '4', '6', '3'),
                                                             ('3', '1', '7', '3'),
                                                             ('3', '2', '8', '3'),
                                                             ('3', '4', '9', '3'),
                                                             ('4', '1', '10', '3'),
                                                             ('4', '2', '11', '3'),
                                                             ('4', '3', '12', '3'),
                                                             ('1', '2', '1', '4'),
                                                             ('1', '3', '2', '4'),
                                                             ('1', '4', '3', '4'),
                                                             ('2', '1', '4', '4'),
                                                             ('2', '3', '5', '4'),
                                                             ('2', '4', '6', '4'),
                                                             ('3', '1', '7', '4'),
                                                             ('3', '2', '8', '4'),
                                                             ('3', '4', '9', '4'),
                                                             ('4', '1', '10', '4'),
                                                             ('4', '2', '11', '4'),
                                                             ('4', '3', '12', '4'),
                                                             ('1', '2', '1', '5'),
                                                             ('1', '3', '2', '5'),
                                                             ('1', '4', '3', '5'),
                                                             ('2', '1', '4', '5'),
                                                             ('2', '3', '5', '5'),
                                                             ('2', '4', '6', '5'),
                                                             ('3', '1', '7', '5'),
                                                             ('3', '2', '8', '5'),
                                                             ('3', '4', '9', '5'),
                                                             ('4', '1', '10', '5'),
                                                             ('4', '2', '11', '5'),
                                                             ('4', '3', '12', '5'),
                                                             ('1', '2', '1', '6'),
                                                             ('1', '3', '2', '6'),
                                                             ('1', '4', '3', '6'),
                                                             ('2', '1', '4', '6'),
                                                             ('2', '3', '5', '6'),
                                                             ('2', '4', '6', '6'),
                                                             ('3', '1', '7', '6'),
                                                             ('3', '2', '8', '6'),
                                                             ('3', '4', '9', '6'),
                                                             ('4', '1', '10', '6'),
                                                             ('4', '2', '11', '6'),
                                                             ('4', '3', '12', '6'),
                                                              ('1', '2', '1', '7'),
                                                             ('1', '3', '2', '7'),
                                                             ('1', '4', '3', '7'),
                                                             ('2', '1', '4', '7'),
                                                             ('2', '3', '5', '7'),
                                                             ('2', '4', '6', '7'),
                                                             ('3', '1', '7', '7'),
                                                             ('3', '2', '8', '7'),
                                                             ('3', '4', '9', '7'),
                                                             ('4', '1', '10', '7'),
                                                             ('4', '2', '11', '7'),
                                                             ('4', '3', '12', '7'),
                                                             ('1', '2', '1', '8'),
                                                             ('1', '3', '2', '8'),
                                                             ('1', '4', '3', '8'),
                                                             ('2', '1', '4', '8'),
                                                             ('2', '3', '5', '8'),
                                                             ('2', '4', '6', '8'),
                                                             ('3', '1', '7', '8'),
                                                             ('3', '2', '8', '8'),
                                                             ('3', '4', '9', '8'),
                                                             ('4', '1', '10', '8'),
                                                             ('4', '2', '11', '8'),
                                                             ('4', '3', '12', '8'),
                                                             ('1', '2', '1', '9'),
                                                             ('1', '3', '2', '9'),
                                                             ('1', '4', '3', '9'),
                                                             ('2', '1', '4', '9'),
                                                             ('2', '3', '5', '9'),
                                                             ('2', '4', '6', '9'),
                                                             ('3', '1', '7', '9'),
                                                             ('3', '2', '8', '9'),
                                                             ('3', '4', '9', '9'),
                                                             ('4', '1', '10', '9'),
                                                             ('4', '2', '11', '9'),
                                                             ('4', '3', '12', '9'),
                                                             ('1', '2', '1', '10'),
                                                             ('1', '3', '2', '10'),
                                                             ('1', '4', '3', '10'),
                                                             ('2', '1', '4', '10'),
                                                             ('2', '3', '5', '10'),
                                                             ('2', '4', '6', '10'),
                                                             ('3', '1', '7', '10'),
                                                             ('3', '2', '8', '10'),
                                                             ('3', '4', '9', '10'),
                                                             ('4', '1', '10', '10'),
                                                             ('4', '2', '11', '10'),
                                                             ('4', '3', '12', '10'),
                                                             ('1', '2', '1', '11'),
                                                             ('1', '3', '2', '11'),
                                                             ('1', '4', '3', '11'),
                                                             ('2', '1', '4', '11'),
                                                             ('2', '3', '5', '11'),
                                                             ('2', '4', '6', '11'),
                                                             ('3', '1', '7', '11'),
                                                             ('3', '2', '8', '11'),
                                                             ('3', '4', '9', '11'),
                                                             ('4', '1', '10', '11'),
                                                             ('4', '2', '11', '11'),
                                                             ('4', '3', '12', '11');


UPDATE users SET  payment = '[]'
