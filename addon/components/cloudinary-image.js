import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { getOwner } from "@ember/application";
import { htmlSafe } from "@ember/string";
import formatter from '../utils/variable-formatter';
import { get } from '@ember/object';

const CloudinaryImageComponent = Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'width', 'height'],

  width: computed('options.{width,crop}', function () {
    if (get(this, 'options.crop') === 'limit' || get(this, 'options.crop') === 'fit' || get(this, 'options.crop') === 'lfill') {
      return null;
    }
    return get(this, 'options.width');
  }),
  height: computed('options.{height,crop}', function () {
    if (get(this, 'options.crop') === 'limit' || get(this, 'options.crop') === 'fit' || get(this, 'options.crop') === 'lfill') {
      return null;
    }
    return get(this, 'options.height');
  }),
  crop: oneWay('options.crop'),
  fetch_format: oneWay('options.fetch_format'),
  quality: oneWay('options.quality'),
  default_image: oneWay('options.default_image'),

  src: computed('publicId', 'width', 'height', 'crop', 'fetch_format', 'quality', 'default_image', function () {
    const cloudName = getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;
    const params = formatter(get(this, 'options'));
    const publicId = get(this, 'publicId');

    const image = `https://res.cloudinary.com/${cloudName}/image/upload${params}/${publicId}`;
    return htmlSafe(image);
  })
});

CloudinaryImageComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryImageComponent;