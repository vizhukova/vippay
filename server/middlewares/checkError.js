
module.exports = function(err, res){

    switch(err.constraint) {
        case 'category_user_uniq':
            res.status(400).send('Такая категория уже существует');
            break;
        case 'check_this_data':
            res.status(400).send('Проверьте правильность заполнения данных');
            break;
        case 'users_login_unique':
            res.status(400).send('Такой пользователь уже существует');
            break;
        case 'product_user_uniq':
            res.status(400).send('Продукт с таким названием у данного пользователя уже существует');
            break;
        default:
            res.status(400).send('We can`t catch this error');
    }
};