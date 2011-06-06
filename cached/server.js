var http = require('http');
var ResizeCache = require('./resize_cache');

var cache = new ResizeCache();

http.createServer(function(req, res) {
  var params = req.url.split('/');
  var path = __dirname + '/' + params[1];
  var size = params[2];

  cache.serve(path, size, res);
}).listen(8080);
