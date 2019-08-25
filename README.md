[![Build Status](https://travis-ci.org/davidbilling/ember-cli-cloudinary-light.svg?branch=master)](https://travis-ci.org/davidbilling/ember-cli-cloudinary-light) [![Greenkeeper badge](https://badges.greenkeeper.io/davidbilling/ember-cli-cloudinary-light.svg)](https://greenkeeper.io/)

# ember-cli-cloudinary-light

Ember addon for Cloudinary without jquery. Works good for fastboot.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Versions 0.4.0 and above Requires Node.js >=8.10.0

## Installation

```ember install ember-cli-cloudinary-light```

Add your cloud name to config/environment.js ENV:

```javascript
cloudinary: {
  cloudName: 'some_cloud_name',
},
```

## Components ##

### cloudinary-image ###

This component will render an <img> built from a cloudinary url and options.

```javascript
{{cloudinary-image 'imageId' (hash width=100)}}
```

Width and height attributes are set on the img tag as well as passed to cloudinary, allowing you to specify the resolution via the "dpr" attribute.

```javascript
{{cloudinary-image 'imageId' (hash width=100 height=100 dpr="2.0")}}
```

### safe-cloudinary-url helper ###

This helper can be used in styles when you want to have dynamic url:s to cloudinary. It will return "background-image: url(..)" ready to use in a style element.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
