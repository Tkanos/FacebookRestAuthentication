var request = require('request');
var jsonWebToken = require('jsonwebtoken');

var loginController = function(userDb)
{
    var jwtSecret = 'mysecretkey'; //put in a conf file

    var getToken = function(req, res) {

        var facebookToken = req.headers['facebooktoken'];

        //TODO : check the expirationdate of facebooktoken

        if(facebookToken) {
            var path = 'https://graph.facebook.com/me?access_token=' + facebookToken;

            request(path, function (error, response, body) {
                var facebookUserData = JSON.parse(body);

                if (!error && response && response.statusCode && response.statusCode == 200) {

                    if(facebookUserData && facebookUserData.id) {

                        var accessToken = jsonWebToken.sign(facebookUserData, jwtSecret, {
                            //Set the expiration
                            expiresIn: 86400 //we are setting the expiration time of 1 day.
                        });

                        res.status(200).send(accessToken);

                    } else {
                        res.status(403);
                        res.send('Access Forbidden');
                    }

                }
                else {
                    console.log(facebookUserData.error);
                    //console.log(response);
                    res.status(500);
                    res.send('Access Forbiden');
                }
            });
        } else {
            res.status(403);
            res.send('Access Forbidden');
        }
    };


    var verifyToken = function(token, callback) {
        if(callback) {
            jsonWebToken.verify(token, jwtSecret, callback);
        } else {
            try {
                var decoded = jsonWebToken.verify(token, jwtSecret);
                return decoded;
            } catch(err) {
                return;
            }
        }
    };

    return {
      get: getToken,
      verify: verifyToken
    };

};

module.exports = loginController;
