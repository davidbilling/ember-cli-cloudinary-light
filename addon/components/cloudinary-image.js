import Ember from 'ember';
import formatter from '../utils/variable-formatter';

const CloudinaryImageComponent = Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'width', 'height'],

  width: Ember.computed('options.width', 'options.crop', function(){
    if(this.get('options.crop') === 'limit' || this.get('options.crop') === 'fit' || this.get('options.crop') === 'lfill'){
      return null;
    }
    return this.get('options.width');
  }),
  height: Ember.computed('options.height', 'options.crop', function(){
    if(this.get('options.crop') === 'limit' || this.get('options.crop') === 'fit' || this.get('options.crop') === 'lfill'){
      return null;
    }
    return this.get('options.height');
  }),
  crop: Ember.computed.oneWay('options.crop'),
  fetch_format: Ember.computed.oneWay('options.fetch_format'),
  quality: Ember.computed.oneWay('options.quality'),
  default_image: Ember.computed.oneWay('options.default_image'),

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