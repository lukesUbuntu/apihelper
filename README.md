## API Helper
An api helper for sending json data for your apps. Currently does not supply much options.
By default Access-Control-Allow-Origin header is set to allow all *


## install
```shell
$ npm install lukesUbuntu/apihelper
```
## Setup
```javascript
var express = require('express');
var api = require('apihelper');

var app = express();

api.set(app);
```

**Example Usage**
```javascript
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
**Example Usage**
```javascript
app.get('/test', function (req, res) {
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
