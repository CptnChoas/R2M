var https = require('https');

var authorize = function () {
    var myKey = 'cbacb8d45d73b5ca9f8c7c4399f03e480c7a3794188cdbf016ec00df3c38721a',
        mySecret = 'abccc689df41ea2f525fcbd974d90c704fc4e5379447ef34005cd08db6f3d9d6';

    var options = {
        hostname: 'api.producthunt.com',
        port: 443,
        path: '/v1/oauth/token',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Host': 'api.producthunt.com'
        },
        body: {
            "client_id": myKey,
            "client_secret": mySecret,
            "grant_type": "client_credentials"
        }
    };

    var auth = https.request(options, function (data) {
        var output = '';
        data.setEncoding('utf8');

        data.on('data', function (chunk) {
            output += chunk;
        });

        data.on('end', function () {
            var obj = JSON.parse(output);
            if (obj.hasOwnProperty('error')) {
                return {message: 'OAuth Error', error: {status: obj.error, stack: obj.error_description}};
            }
            else {
                return obj;
            }
        });
    });

    auth.on('error', function (err) {
        res.render('error');
    });

    auth.end();
}