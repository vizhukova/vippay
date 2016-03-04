var Acl = require('../models/Acl');

module.exports = function(req){

   return Acl.get({staff_id: req.staffObj.id}).then((routes) => {
       req.staffObj.routes = routes;
       return Acl.getRoutes().then((entities) => {
           req.entity = entities;
       })
   })

};