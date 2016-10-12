var express = require('express')

var app = express();
var port = 5000;

/* ROUTING */

var apiRouter = require('./Api/apiRouter.js');
app.use('/api', apiRouter());


app.get('/', function(req, res) {
  res.send('Welcome on board');  
});

app.listen(port, function() {
    console.log('Running on port : ' + port);
});

module.exports = app;
