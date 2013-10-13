# rgb-pack [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Packs integer values from a 2D
[ndarray](http://github.com/mikolalysenko/ndarray) into an RGB one for storing
as compressed images.

Works particularly well for storing heightmaps with more precision than
a single channel can offer - instead of a dynamic range of 256 values, you get
16,777,216. You could combine this pretty easily with
[save-pixels](http://github.com/mikolalysenko/save-pixels) and
[get-pixels](http://github.com/mikolalysenko/get-pixels) for good results.

## Usage ##

[![rgb-pack](https://nodei.co/npm/rgb-pack.png?mini=true)](https://nodei.co/npm/rgb-pack)

### `require('rgb-pack').pack(map[, image])` ###

Packs a 2D ndarray `map` into a 3D `image` ndarray. You could then use
`save-pixels` to store this result as a PNG image.

If you don't supply an `image`, one will be created for you.

Note that the data in `map` are expected to be integer values between 0 and
16,777,216.

### `require('rgb-pack').unpack(image[, map])` ###

Unpacks a previously packed `image` ndarray into a 2D `map`.

If you don't supply a `map`, one will be created for you.

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/rgb-pack/blob/master/LICENSE.md) for details.
