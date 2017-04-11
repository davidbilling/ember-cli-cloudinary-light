import Ember from 'ember';

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
    const height = this.get('height');
    const width = this.get('width');
    const crop = this.get('crop');
    const ff = this.get('fetch_format');
    const quality = this.get('quality');
    const default_img = this.get('default_image');
    const publicId = this.get('publicId');
    const cloudName = Ember.getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;

    const image = `https://res.cloudinary.com/${cloudName}/image/upload/h_${height},w_${width},c_${crop},f_${ff},q_${quality},d_${default_img}/${publicId}`;
    return Ember.String.htmlSafe(image);
  })
});

CloudinaryImageComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryImageComponent;