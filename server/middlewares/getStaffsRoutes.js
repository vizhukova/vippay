var Acl = require('../models/Acl');

/**
 * Получение списка прав доступа для сотрудника
 * @param req
 * @returns {*}
 */
module.exports = function(req){

   return Acl.get({staff_id: req.staffObj.id}).then((routes) => {
       req.staffObj.routes = routes;
       return Acl.getRoutes().then((entities) => {
           req.entity = entities;
       })
   })

};