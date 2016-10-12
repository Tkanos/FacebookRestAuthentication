# FacebookRestAuthentication
I want to Authenticate a REST Api using facebook

## Summary

I want that my WebApp authenticate the user with facebook.
Once it is done, the WebApp will send the facebookToken to the api, and thanks to that the api will be able to have access to facebook user infomation.
And we will be able to create a JsonWebToken to authenticate our REST api.

## How to test this Api

You can get one for test on https://developers.facebook.com/tools/explorer/?method=GET&path=me&version=v2.7

![Get Token](https://github.com/Tkanos/FacebookRestAuthentication/blob/master/images/GetFacebookToken.png)

Then (after have done a npm start), you can use a Rest App to call our Login service.
put your facebooktoken on the header, you will receive the jsonwebtoken on the response:

![Rest Call](https://github.com/Tkanos/FacebookRestAuthentication/blob/master/images/RestCall.png)

## How it works

(On API/Login/LoginController)
receiving the facebookToken we get all the information the user share with us calling :
```
'https://graph.facebook.com/me?access_token=' + facebookToken;
```

Once we have the answer, that is all information of our user on Json.
We can "Serialize" it on jsonwebtoken. and send back our new token that will be use to communicate with our api.

As you can see on API/apiRouter.js, we will get the jsonwebtoken on everycomminication we have "deserialize" it in order to have our user information back in json.
```
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
```

So in all methods of my application I will potentially have the userconnected attaxched to the request.
```
req.connectedUser
```




