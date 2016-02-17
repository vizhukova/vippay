
module.exports = function(req, res, next){
    switch(req.body.login) {
        case 'auth':
        case 'payments': res.status(400).send('Пользователь с таким логином уже существует');
            break;
        default: next();
    }
};