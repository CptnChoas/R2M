var express = require('express');
var router = express.Router();

var https = require('https');
//var querystring = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
    var accessToken = '7be0c816e737376d7aad968e29f96880e51446e8be9efbc0730bf489cc0f69d8';
    options = {
        hostname: 'api.producthunt.com',
        port: 443,
        path: '/v1/posts',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
            //'Authorization': 'Bearer' + new Buffer(key + ":" + secret, "utf8").toString("base64"),
            'Host': 'api.producthunt.com'
        }
    };

    var get = https.request(options, function (data) {
        var output = '';
        data.setEncoding('utf8');

        data.on('data', function (chunk) {
            output += chunk;
        });

        data.on('end', function() {
            var obj = JSON.parse(output);
            if(obj.hasOwnProperty('error')){
                res.render('error', {message:'Error', error:{status:obj.error, stack:obj.error_description}})
            }
            else{
                res.render('index', {posts:obj.posts});
            }
        });
    });

    get.on('error', function (err) {
        res.render('error');
    });

    get.end();
});

/* GET home page. */
router.get('/posts', function(req, res, next) {
    var myKey = 'cbacb8d45d73b5ca9f8c7c4399f03e480c7a3794188cdbf016ec00df3c38721a',
        mySecret = 'abccc689df41ea2f525fcbd974d90c704fc4e5379447ef34005cd08db6f3d9d6';

    var body = {
        "client_id" : myKey,
        "client_secret" : mySecret,
        "grant_type" : "client_credentials"
    };
    body = JSON.stringify(body);

    var options = {
        hostname: 'api.producthunt.com',
        port: 443,
        path: '/v1/oauth/token',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': body.length,
            //'Authorization': 'Bearer ' + accessToken,
            //'Authorization': 'Bearer' + new Buffer(key + ":" + secret, "utf8").toString("base64"),
            'Host': 'api.producthunt.com'
        }
    };

    var auth = https.request(options, function (data) {
        var output = '';
        data.setEncoding('utf8');

        data.on('data', function (chunk) {
            output += chunk;
        });

        data.on('end', function() {
            var obj = JSON.parse(output);
            if(obj.hasOwnProperty('error')){
                res.render('error', {message:'Error', error:{status:obj.error, stack:obj.error_description}});
            }
            else{
                //res.render('error', {message:'OAuth Info', error:{status:'response', stack:output}});
                var accessToken = obj['access_token'];
                options = {
                    hostname: 'api.producthunt.com',
                    port: 443,
                    path: '/v1/posts',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken,
                        //'Authorization': 'Bearer' + new Buffer(key + ":" + secret, "utf8").toString("base64"),
                        'Host': 'api.producthunt.com'
                    }
                };

                var get = https.request(options, function (data) {
                    var output = '';
                    data.setEncoding('utf8');

                    data.on('data', function (chunk) {
                        output += chunk;
                    });

                    data.on('end', function() {
                        var obj = JSON.parse(output);
                        if(obj.hasOwnProperty('error')){
                            res.render('error', {message:'Error', error:{status:obj.error, stack:obj.error_description}})
                        }
                        else{
                            res.render('posts', {posts:obj.posts});
                        }
                    });
                });

                get.on('error', function (err) {
                    res.render('error');
                });

                get.end();
            }
        });
    });

    auth.write(body);

    auth.on('error', function (err) {
        res.render('error');
    });

    auth.end();
});

module.exports = router;
