
module.exports = function(req, res, next){
   /*if(! req.user.id) {
       if(! req.partnerObj) {
           res.redirect(`http://autn.${req.postdomain}`);
       } else {
           res.redirect(`http://${req.clientObj.login}.${req.postdomain}/partner`);
       }
   } else {
   }*/
    next();
};