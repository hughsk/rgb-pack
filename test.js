var perlin = require('perlin').noise.perlin2
var fill = require('ndarray-fill')
var nops = require('ndarray-ops')
var zero = require('zeros')
var test = require('tape')

var unpack = require('./').unpack
var pack = require('./').pack

test('Basic check', function(t) {
  var heightmap = fill(zero([32, 32]), function(x, y) {
    return ((perlin(x*0.0089248 + 0.051, y*0.0089248 + 0.9238) + 1) * 256 * 256 * 128)|0
  })

  var ll = heightmap.data.length
  var ok = true
  var repacked = unpack(pack(heightmap))
  for (var i = 0; i < ll; i++)
    ok = ok && heightmap.data[i] === repacked.data[i]

  t.ok(ok, 'original and packed/unpacked arrays are equal')
  t.end()
})
