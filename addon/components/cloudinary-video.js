import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { scheduleOnce } from "@ember/runloop";
import { getOwner } from "@ember/application";
import { htmlSafe } from "@ember/string";
import $ from 'jquery';
import formatter from '../utils/variable-formatter';

const CloudinaryVideoComponent = Component.extend({
  tagName: 'source',
  attributeBindings: ['src', 'width', 'height'],

  didInsertElement () {
    this._super(...arguments);
    const _this = this;

    this._resizeHandler = function() {
      scheduleOnce('afterRender', this, ()=> {
        if($('.grid__item').width()){
          _this.set('width', $('.grid__item').width());
        }
      });
    }.bind(this);
    $(window).on('resize', this._resizeHandler);
    this._resizeHandler();
  },

  willDestroyElement () {
    $(window).off('resize', this._resizeHandler);
  },

  width: oneWay('options.width'),
  height: oneWay('options.height'),
  crop: oneWay('options.crop'),
  fetch_format: oneWay('options.fetch_format'),
  quality: oneWay('options.quality'),
  radius: oneWay('options.radius'),

  src: computed('publicId', 'width', 'height', 'crop', 'fetch_format', 'quality', 'radius', function() {
    const cloudName = getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;
    let options = this.get('options');

    //if matchWidth set to true then set to actual width
    if(this.get('options') && this.get('options.matchWidth') === true){
      if (!this.get('width')) {
        return;
      }
      options.width = this.get('width');
    }

    const params = formatter(options);
    const publicId = this.get('publicId');

    const cloudinaryVideoTag = `https://res.cloudinary.com/${cloudName}/video/upload${params}/${publicId}`;
    return htmlSafe(cloudinaryVideoTag);
  }),
});

CloudinaryVideoComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryVideoComponent;
