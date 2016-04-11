## API Helper
An api helper for usage with Express for sending json calls and making life a little easier
(will update readme for usage soon)


## install
```shell
$ npm install lukesUbuntu/apihelper
```
## Setup
```javascript
var express = require('express');
var api = require('apihelper');

var app = express();

app.use(api.helper);
```

**Usages **
```javascript
//Send hello world! as a success
api.send('hello world!');
//Send hello world! as failed status code 400
api.send('hello world!',false);
//send hello world! with custom status code 404
api.send('hello world!',404);
//get full express request
var request = api.getRequest();
//get full express response
var response = api.getResponse();
//get all parameters or get a single parameter name
var prams = api.getVars();
var item_id =  api.getVars('item_id');
//add a header to the call eg. Cross-origin support
api.headers.add("Access-Control-Allow-Origin","*");
```

# Some Examples

**Add headers/ eg : Cross-origin support **
```javascript
var app = express();

app.use(api.helper);
api.headers.add("Access-Control-Allow-Origin","*");

```

**Example Send Usage**
```javascript
//http://localhost:3000/

app.get('/', function () {
    api.send('hello word')
});
```
**Returns**
```javascript
{
    "data": "hello word",
    "success": true
}
```
**Example Send Obj Usage**
```javascript
//http://localhost:3000/test/
app.get('/test', function () {
    var test = {
        'me' : false
    };
    api.send(test)
});
```
**Returns**
```javascript
{
    "data": {
        "me": false
    },
    "success": true
}
```

**Example getVars | parameter usage**
```javascript
//http://localhost:3000/mesg/helloworld
app.get('/msg/:message', function() {
    //pull a parameter
    var message = api.getVars('message');

    //pull all parameters
    var getAllVars = api.getVars();

    var myTest = {
        'message' : message,
        'timestamp' : new Date().getTime(),
         'getVars' : getAllVars
    };
    api.send(myTest);
});
```



There is a example.js containing some uses