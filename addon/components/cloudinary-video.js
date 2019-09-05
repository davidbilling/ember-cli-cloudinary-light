import Ember from 'ember';  //So far Ember.Handlebars.Utils.escapeExpression is not a Module
import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { getOwner } from "@ember/application";
import { htmlSafe } from "@ember/string";
import formatter from '../utils/variable-formatter';
import { get } from '@ember/object';

const CloudinaryVideoComponent = Component.extend({
  tagName: 'source',
  attributeBindings: ['src', 'width', 'height'],

  width: oneWay('options.width'),
  height: oneWay('options.height'),
  crop: oneWay('options.crop'),
  fetch_format: oneWay('options.fetch_format'),
  quality: oneWay('options.quality'),
  radius: oneWay('options.radius'),

  src: computed('publicId', 'width', 'height', 'crop', 'fetch_format', 'quality', 'radius', function () {
    /* Note: You must implement #escapeCSS. */
    const cloudName = Ember.Handlebars.Utils.escapeExpression(getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName);
    let options = get(this, 'options');

    const params = Ember.Handlebars.Utils.escapeExpression(formatter(options));
    const publicId = Ember.Handlebars.Utils.escapeExpression(get(this, 'publicId'));

    const cloudinaryVideoTag = `https://res.cloudinary.com/${cloudName}/video/upload${params}/${publicId}`;
    return htmlSafe(cloudinaryVideoTag);
  }),
});

CloudinaryVideoComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryVideoComponent;
