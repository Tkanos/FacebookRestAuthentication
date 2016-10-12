var express = require('express');

var routes = function() {

    var loginRouter = express.Router();
    var loginController = require('./loginController')();

    loginRouter.route('/')
        .get(loginController.get);

    return loginRouter;

};

module.exports = routes;
