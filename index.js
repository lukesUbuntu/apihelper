/**
 * Sends the API request
 * @type {{res: boolean, success: boolean, send: api.send}}
 */
"use strict";

var api = {
    _res: false,
    _req: false,
    _headers: [],
    headers: {
        add: function (header, value) {
            //if (!api._res.headersSent)
            api._headers[header] = value
        }
    },
    send: function (data, success) {

        api.success = typeof success == "undefined" ? true : success;
        var statusCode = (typeof success == "number") ? parseInt(statusCode) : (api.success == true ? 200 : 400);

        if (api._res == false)
            return console.dir("apihelper Can't send response, api.res not set");


        //Issue Can't set headers after they are sent
        for (var header in api._headers)
            api._res.setHeader(header, api._headers[header]);


        try {
            api._res.status(statusCode).json({
                'data': data,
                'success': api.success
            });
        } catch (e) {
        }


    },
    getVars: function (pram) {
        return (typeof pram == "string") ? api._req.params[pram] : api._req.params;
    },
    getRequest: function () {
        return api._res;
    },
    getResponse: function () {
        return api._req;
    },
    helper: function (req, res, next) {
        //api.headers.add('Content-Type', 'application/json');
        api._res = res;
        api._req = req;
        next();


    }
};

module.exports = api;
