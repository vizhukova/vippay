/**
 * Обработка кроссдоменных запросов
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token, x-round');

		if ('OPTIONS' == req.method) {
			res.send(200);
		}
		else {
			next();
		}

};