var spawn = require('child_process').spawn;
var ImageBuffer = require('./image_buffer');

module.exports = ResizeCache;
function ResizeCache() {
  this._cache = {};
}

ResizeCache.prototype.serve = function(path, size, res) {
  var key = path + ':' + size;

  res.writeHead(200, {'Content-Type': 'image/jpeg'});

  var cached = this._cache[key];
  if (cached) {
    cached.pipe(res);
    return;
  }

  var convert = spawn('convert',  [path, '-resize', size, '-']);
  var cached = new ImageBuffer();

  convert.stdout.pipe(cached);
  convert.stdout.pipe(res);

  convert.stdout.pause = function() {};

  this._cache[key] = cached;
};
