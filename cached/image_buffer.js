var util = require('util');
var Stream = require('stream').Stream;

module.exports = ImageBuffer;
function ImageBuffer() {
  Stream.call(this);

  this.writable = true;

  this._buffers = [];
  this._ended = false;
};
util.inherits(ImageBuffer, Stream);

ImageBuffer.prototype.write = function(buffer) {
  this._buffers.push(buffer);
};

ImageBuffer.prototype.pipe = function(dest, offset) {
  for (var i = offset || 0; i < this._buffers.length; i++) {
    dest.write(this._buffers[i]);
  }

  if (this._ended) {
    dest.end();
    return;
  }

  setTimeout(function() {
    this.pipe(dest, i);
  }.bind(this), 50);
};

ImageBuffer.prototype.end = function() {
  this._ended = true;
};
