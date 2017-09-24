var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  var options = {
      host: 'api.producthunt.com',
      port: 443,
      path: '/v1/categories/topic-4/posts',
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer cbacb8d45d73b5ca9f8c7c4399f03e480c7a3794188cdbf016ec00df3c38721a',
          Host: 'api.producthunt.com'
      }
  };

  var get = https.request(options, function (data) {
      var output = '';
      console.log(options.host + ':' + res.statusCode);
      data.setEncoding('utf8');

      data.on('data', function (chunk) {
          output += chunk;
      });

      data.on('end', function() {
          var obj = JSON.parse(output);
          console.log(JSON.stringify(obj));
          res.render('index', {posts:obj.posts.map(function (t) { return t.name; })});
      });
  });

  get.on('error', function (err) {
     res.render('error');
  });

  get.end();
});

module.exports = router;
