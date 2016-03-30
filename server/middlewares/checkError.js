var log = require('./../utils/log');
var logg = new log('db');


module.exports = function(err, res){

    switch(err.constraint) {
        case 'category_user_uniq':
            res.status(400).send('Такая категория уже существует');
            break;
        case 'check_this_data':
            res.status(400).send('Проверьте правильность заполнения данных');
            break;
        case 'users_login_unique':
            res.status(400).send('Пользователь с таким логином уже существует');
            break;
         case 'users_email_unique':
            res.status(400).send('Пользователь с такой электронной почтой уже существует');
            break;
        case 'product_user_uniq':
            res.status(400).send('Продукт с таким названием у данного пользователя уже существует');
            break;
        case 'products_category_id_foreign':
            res.status(400).send('Нельзя удалить эту категорию, так как у нее все еще есть продукты');
            break;
        case 'check_old_password':
            res.status(400).send('Проверьте правильность написания старого пароля');
            break;
        case 'too_big_value':
            res.status(400).send('Слишком большое числовое значение в поле');
            break;
        case 'partner_links_pkey':
            res.status(400).send('Такой код идентификации у этого пользователя уже существует');
            break;
        case 'too_long_description':
            res.status(400).send('Слишком длинный комментарий.Не более 255 символов.');
            break;
        case 'staff_login_uniq':
            res.status(400).send('Сотрудник с таким логином у этого клиента уже существует.');
            break;
        case 'staff_email_uniq':
            res.status(400).send('Сотрудник с такой электронной почтой у этого клиента уже существует.');
            break;
        case 'check_data_staff':
            res.status(400).send('Такого сотрудника не зарегестрированно. Проверьте правильность введения данных или ссылку входа.');
            break;
        case 'products_upsell_id_foreign':
            res.status(400).send('Это продукт нельзя удалить, так как существует скидка(1+1), которая его содержит.');
            break;
        case 'uniq_upsell_product':
            res.status(400).send('Создавать скидку на один и тот же продукт более одного раза нельзя.');
            break;
        case 'promo_code_uniq':
            res.status(400).send('Такой промо код у этого клиента уже существует');
            break;
        case 'no_promo_product':
            res.status(400).send('Такого промо кода не существует или он неприменим к выбранному продукту');
            break;
        case 'upsell_product_product_id_foreign':
            res.status(400).send('Нельзя удалить этот продукт, так как он участвует в акции 1+1');
            break;
        case 'too_long_link':
            res.status(400).send('Слишком длинное значение ссылки');
            break;
        case 'wrong_password':
            res.status(400).send('Не верный пароль');
            break;
        case 'you_are_not_registered':
            res.status(400).send('Вы не зарегистрированы');
            break;
        default:
            if(err.errors) {
                var keys = Object.keys(err.errors) || [];
                res.status(400).send(err.errors[keys[0]].message);
            }
            else res.status(400).send();

            logg.log(err, 'error');
    }
};