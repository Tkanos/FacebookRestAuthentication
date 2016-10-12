var express = require('express');

var routes = function() {

    var apiRouter = express.Router();

    apiRouter.use('/', function(req, res, next){
            var jwt = req.headers.authorization;
            if(jwt) {
                var jwtManager = require('./Login/loginController')();

                jwtManager.verify(accessToken, function(err, decoded){
                   if(err) {
                       res.status(401).send('Invalid Token');
                   }
                   else {
                       req.connectedUser = decoded;
                       next();
                   }
                });
            }
            else {
                next();
            }
        });

    apiRouter.route('/')
        .get(function(req, res){
            res.send("Welcome on api");
        });

    var loginRoutes = require('./Login/loginRoutes');
    apiRouter.use('/Login', loginRoutes());

    return apiRouter;
};

module.exports = routes;
