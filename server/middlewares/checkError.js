
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
            res.status(400).send('Слишком большое значение');
            break;
        default:
            res.status(400).send('Упс, что то пошло не так');
    }
};