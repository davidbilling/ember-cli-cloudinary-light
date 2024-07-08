# ember-cli-cloudinary-light

[Short description of the addon.]

## Compatibility

- Ember.js v4.12 or above
- Ember CLI v4.12 or above
- Node.js v18 or above

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

## Usage

This component will render an ``<img>`` built from a cloudinary url and options.

```hbs
<CloudinaryImage @publicId={{this.myImageId}} @options={{hash width='60' height='60' crop='fill' quality='auto'}} />
```

Width and height attributes are set on the img tag as well as passed to cloudinary, allowing you to specify the resolution via the "dpr" attribute.

```hbs
<CloudinaryImage @publicId={{this.myImageId}} @options={{hash width='60' height='60' dpr='2.0'}} />
```

### cloudinary-video ###

This will render a ``<source>`` for use in a ``<video>``

```hbs
<video controls>
  <CloudinaryVideo @publicId='dog.mp4'/>
</video>
```

### cloudinary-resource-list ###

Cloudinary's Client Side Resource Lists allow you to list cloudinary resources for a given tag.

```hbs
<CloudinaryResourceList @cloudinaryTag='logo' as |resourceList|>
  {{#each resourceList.items as |item|}}
    <span>{{item.public_id}}</span>
  {{/each}}
</CloudinaryResourceList>
```

### safe-cloudinary-url helper ###

This helper can be used in styles when you want to have dynamic url:s to cloudinary. It will return "background-image: url(..)" ready to use in a style element.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
