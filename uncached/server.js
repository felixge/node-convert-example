var http = require('http');
var spawn = require('child_process').spawn;

http.createServer(function(req, res) {
  var params = req.url.split('/');
  var path = __dirname + '/' + params[1];
  var size = params[2];

  var convert = spawn('convert',  [path, '-resize', size, '-']);
  res.writeHead(200);
  convert.stdout.pipe(res);
}).listen(8080);
