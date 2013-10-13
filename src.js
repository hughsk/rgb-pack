var ndarray = require('ndarray')
var cwise = require('cwise')

const RED   = 0
const GREEN = 1
const BLUE  = 2
const ALPHA = 3

const FACTOR_RED   = 256 * 256
const FACTOR_GREEN = 256
const FACTOR_BLUE  = 1

const X = 0
const Y = 1
const CHANNEL = 2

module.exports.pack   = pack
module.exports.unpack = unpack

var packer = cwise({
    args: ['array', 'scalar', 'index']
  , body: function(image, heightmap, idx) {
    var channel = idx[CHANNEL]
    var value = heightmap.get(idx[X], idx[Y])
    if (channel === RED)   image = (value >> 16) & 255; else
    if (channel === GREEN) image = (value >> 8) & 255; else
    if (channel === BLUE)  image = (value) & 255; else
    if (channel === ALPHA) image = 255
  }
})

var unpacker = cwise({
    args: ['array', 'scalar', 'index']
  , body: function(heightmap, image, idx) {
    heightmap = (
        image.get(idx[X], idx[Y], RED)   * FACTOR_RED
      + image.get(idx[X], idx[Y], GREEN) * FACTOR_GREEN
      + image.get(idx[X], idx[Y], BLUE)  * FACTOR_BLUE
    )
  }
})

function pack(heightmap, image) {
  var width = heightmap.shape[0]
  var height = heightmap.shape[1]
  var shape = [width, height, 4]

  image = image || ndarray(new Uint8Array(width * height * 4), shape)
  packer(image, heightmap)

  return image
}

function unpack(image, heightmap) {
  var width = image.shape[0]
  var height = image.shape[1]
  var shape = [width, height]

  heightmap = heightmap || ndarray(new Float32Array(width * height), shape)
  unpacker(heightmap, image)

  return heightmap
}
