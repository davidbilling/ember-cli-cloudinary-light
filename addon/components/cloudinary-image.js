import Ember from 'ember';
import formatter from '../utils/variable-formatter';

const CloudinaryImageComponent = Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'width', 'height'],

  width: Ember.computed.alias('options.width'),
  height: Ember.computed.alias('options.height'),
  crop: Ember.computed.alias('options.crop'),
  fetch_format: Ember.computed.alias('options.fetch_format'),
  quality: Ember.computed.alias('options.quality'),
  default_image: Ember.computed.alias('options.default_image'),

  src: Ember.computed('publicId', 'width', 'height', 'crop', 'fetch_format', 'quality', 'default_image', function() {
    const cloudName = Ember.getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;
    const params = formatter(this.get('options'));
    const publicId = this.get('publicId');

    const image = `https://res.cloudinary.com/${cloudName}/image/upload${params}/${publicId}`;
    return Ember.String.htmlSafe(image);
  })
});

CloudinaryImageComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryImageComponent;