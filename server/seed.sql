INSERT INTO users (login, email, password, name) VALUES ('login1', 'email1@sss.ss', 'password1', 'name1'),
                                                                          ('login2', 'email2@sss.ss', 'password2', 'name2'),
                                                                          ('login3', 'email3@sss.ss', 'password3', 'name3'),
                                                                          ('login4', 'email4@sss.ss', 'password4', 'name4'),
                                                                          ('login5', 'email5@sss.ss', 'password5', 'name5'),
                                                                          ('login6', 'email6@sss.ss', 'password6', 'name6');

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

INSERT INTO products (category_id, user_id, name, price, product_link, image, description)
              VALUES ('1', '1', 'product1', '12', 'product_link11', 'image11', 'description11'),
                    ('2', '1', 'product2', '22', 'product_link22', 'image22', 'description2'),
                    ('5', '2', 'product3', '133', 'product_link33', 'image33', 'description33'),
                    ('6', '3', 'product4', '42', 'product_link44', 'image44', 'description44'),
                    ('7', '4', 'product55', '52', 'product_link55', 'image55', 'description55'),
                    ('8', '5', 'product6', '162', 'product_link66', 'image66', 'description66'),
                    ('9', '6', 'product17', '172', 'product_link77', 'image77', 'description77'),
                    ('11', '6', 'product8', '182', 'product_link88', 'image88', 'description88');

INSERT INTO partners (client_id, email, password, name, login)
             VALUES ('1', 'email23@sss.ss', '123', 'name0', 'login32'),
                    ('2', 'email54@sss.ss', '123', 'name87', 'login34'),
                    ('3', 'email67@sss.ss', '123', 'name56', 'login45'),
                    ('4', 'email87@sss.ss', '123', 'name34', 'login54'),
                    ('5', 'email90@sss.ss', '123', 'name22', 'login65');

INSERT INTO customers (partner_id) VALUES ('{"partner_id": ["1, 2, 3"], "product_id": "1"}'),
                                            ('{"partner_id": ["2, 1, 2"], "product_id": "2"}'),
                                            ('{"partner_id": ["3, 4, 5"], "product_id": "3"}'),
                                            ('{"partner_id": ["4, 1, 4"], "product_id": "4"}'),
                                            ('{"partner_id": ["5, 1, 3"], "product_id": "5"}');

