/**
 * Created by luke on 3/27/16.
 */
var express = require('express');
var api = require('./index');

var app = express();

app.use(api.helper);
api.headers.add("Access-Control-Allow-Origin","*")

//example http://localhost:3000/
app.get('/', function() {
    api.send('hello world');
});

//example http://localhost:3000/fail/5
app.get('/fail/:amount', function() {
    //pull a parameter
    var amount = api.getVars('amount');

    if (amount > 10 )
        api.send("Correct Amount");
    else
        api.send("Invalid Amount",false);   //sends errcode 400 with success:false
});


//example http://localhost:3000/msg/helloworld
app.get('/msg/:message', function() {
    //pull a parameter
    var message = api.getVars('message');
    console.log(api.getResponse());
    //or just return all of the request
    var getVars = api.getVars();

    var myTest = {
        'message' : message,
        'timestamp' : new Date().getTime(),
         'getVars' : getVars
    };
    api.send(myTest);
});

//example http://localhost:3000/code/400
app.get('/code/:code', function() {
    //pull a parameter
    var code = parseInt(api.getVars('code'));

    api.send("sendcode response test",true,code);
});

app.listen(3000, function() {
    console.log("Express server listening on port ");
});