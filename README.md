[![Build Status](https://travis-ci.org/davidbilling/ember-cli-cloudinary-light.svg?branch=master)](https://travis-ci.org/davidbilling/ember-cli-cloudinary-light) [![Greenkeeper badge](https://badges.greenkeeper.io/davidbilling/ember-cli-cloudinary-light.svg)](https://greenkeeper.io/)

# ember-cli-cloudinary-light

Ember addon for Cloudinary without jquery. Works good for fastboot.

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

```javascript
<div class="your_class" style={{safe-cloudinary-url 'image_id' width='auto' dpr='auto' }}>
</div>
```

### cloudinary-video ###

This component will render &lt;source&gt;&lt;/source&gt; tags generated from a cloudinary video and options.

```javascript
<video>
    {{cloudinary-video 'videoId' (hash width=100)}}
</video>
```

### cloudinary-resource-list ###

This component issues an API call to Cloudinary's [Client-side resource lists](http://cloudinary.com/documentation/image_transformations#client_side_resource_lists) and will make all Cloudinary resource items available under an `items` property.

Usage example:

```javascript
  {{#cloudinary-resource-list 'my-cloudinary-tag' as |resourceList|}}
    {{#each resourceList.items as |item|}}
      {{cloudinary-image item.public_id (hash width=100)}}
    {{/each}}
  {{/cloudinary-resource-list}}
```

Optional: the list will be sorted by an `order` metadata property on the Cloudinary resource.

Please see the Cloudinary API docs for all available properties of a resource item.

* `git clone <repository-url>` this repository
* `cd ember-cli-cloudinary-light`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
