/**
 * Sends the API request
 * @type {{res: boolean, success: boolean, send: api.send}}
 */
"use strict";

var api = {
    _res: false,
    _req : false,
    _headers: [],
    headers: {
        add: function (header, value) {
            api._headers[header] = value
        }
    },
    send: function (data, success,statusCode) {

        api.success = typeof success == "undefined" ? true : success;

        if (api._res == false) {
            return console.dir("apihelper Can't send response, api.res not set");
        }
        //apend headers
        for (var header in api._headers)
            api._res.setHeader(header,api._headers[header]);




        api._res.status((typeof statusCode == "number") ? parseInt(statusCode) : (api.success == true) ? 200 : 400).send(JSON.stringify({
            'data': data,
            'success': api.success
        }));
    },
    getVars : function(pram){
        return (typeof pram == "string") ? api._req.params[pram] : api._req.params;
    },
    getRequest : function(){
        return api._res;
    },
    getResponse : function(){
        return api._req;
    },
    helper: function (req, res, next) {
        api.headers.add('Content-Type', 'application/json');
        api._res = res;
        api._req = req;
        next();
    }
};

module.exports = api;
