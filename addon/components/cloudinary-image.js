import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { getOwner } from "@ember/application";
import { htmlSafe } from "@ember/string";
import formatter from '../utils/variable-formatter';

const CloudinaryImageComponent = Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'width', 'height'],

  width: computed('options.width', 'options.crop', function(){
    if(this.get('options.crop') === 'limit' || this.get('options.crop') === 'fit' || this.get('options.crop') === 'lfill'){
      return null;
    }
    return this.get('options.width');
  }),
  height: computed('options.height', 'options.crop', function(){
    if(this.get('options.crop') === 'limit' || this.get('options.crop') === 'fit' || this.get('options.crop') === 'lfill'){
      return null;
    }
    return this.get('options.height');
  }),
  crop: oneWay('options.crop'),
  fetch_format: oneWay('options.fetch_format'),
  quality: oneWay('options.quality'),
  default_image: oneWay('options.default_image'),

  src: computed('publicId', 'width', 'height', 'crop', 'fetch_format', 'quality', 'default_image', function() {
    const cloudName = getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;
    const params = formatter(this.get('options'));
    const publicId = this.get('publicId');

    const image = `https://res.cloudinary.com/${cloudName}/image/upload${params}/${publicId}`;
    return htmlSafe(image);
  })
});

CloudinaryImageComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryImageComponent;