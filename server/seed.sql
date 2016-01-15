INSERT INTO users ('login', 'email', 'password', 'name', 'token') VALUES ('login1', 'email1@sss.ss', 'password1', 'name1'),
                                                                          ('login2', 'email2@sss.ss', 'password2', 'name2'),
                                                                          ('login3', 'email3@sss.ss', 'password3', 'name3'),
                                                                          ('login4', 'email4@sss.ss', 'password4', 'name4'),
                                                                          ('login5', 'email5@sss.ss', 'password5', 'name5'),
                                                                          ('login6', 'email6@sss.ss', 'password6', 'name6');

INSERT INTO categories ('category', 'user_id') VALUES ('category1', '1'),
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

INSERT INTO products ('category_id', 'user_id', 'name', 'price', 'product_link', ) VALUES ('category1', '1'),