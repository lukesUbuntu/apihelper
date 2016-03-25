/**
 * Sends the API request
 * @type {{res: boolean, success: boolean, send: api.send}}
 */
var api = {
    _res: false,
    send: function (data, success) {

        api.success = typeof success == "undefined" ? true : success;

        if (api._res == false) {
            return console.log("apihelper Can't send response, api.res not set");
        }

        api._res.setHeader('Access-Control-Allow-Origin', '*');
        api._res.setHeader('Content-Type', 'application/json');

        api._res.status(api.success == true ? 200 : 400).send(JSON.stringify({
            'data': data,
            'success': api.success
        }));
    },

    set: function (app) {
        if (app && typeof app.use == "function")
            return app.use(function (req, res, next) {
                api._res = res;
                next();
            });

        return console.log("apihelper failed to hook into express")

    }
};


module.exports = api;