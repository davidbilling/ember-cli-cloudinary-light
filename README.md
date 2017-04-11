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

### cloudinary-video ###

This component will render &lt;source&gt;&lt;/source&gt; tags generated from a cloudinary video and options.

```javascript
<video>
    {{cloudinary-video 'videoId' (hash width=100)}}
</video>
```

There is an extra 'matchWidth' option that will resize the video to the width of the component.

```javascript
<video>
    {{cloudinary-video 'videoId' (hash controls=true matchWidth=true)}}
</video>
```

* `git clone <repository-url>` this repository
* `cd ember-cli-cloudinary-light`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

