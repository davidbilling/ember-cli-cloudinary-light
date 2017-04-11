import Ember from 'ember';
import layout from '../templates/components/cloudinary-video';

const CloudinaryVideoComponent = Ember.Component.extend({
  layout: layout,
  tagName: 'source',
  attributeBindings: ['src', 'width', 'height'],

  didInsertElement () {
    this._super(...arguments);
    const _this = this;

    this._resizeHandler = function() {
      Ember.run.scheduleOnce('afterRender', this, ()=> {
        _this.set('width', Ember.$('.grid__item').width());
      });
    }.bind(this);
    Ember.$(window).on('resize', this._resizeHandler);
    this._resizeHandler();
  },

  willDestroyElement () {
    Ember.$(window).off('resize', this._resizeHandler);
  },

  width: Ember.computed.alias('options.width'),
  height: Ember.computed.alias('options.height'),
  crop: Ember.computed.alias('options.crop'),
  fetch_format: Ember.computed.alias('options.fetch_format'),
  quality: Ember.computed.alias('options.quality'),
  radius: Ember.computed.alias('options.radius'),

  src: Ember.computed('publicId', 'width', 'height', 'crop', 'fetch_format', 'quality', function() {
    const cloudName = Ember.getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;
    let variables = [];

    //if matchWidth set to true then set to actual width
    if(this.get('options.matchWidth') === true){
      if (!this.get('width')) {
        return;
      }
      this.set('options.width', this.get('width'));
    }

    if(this.get('height')){
      variables.push('h_' + this.get('height'));
    }
    if(this.get('width')){
      variables.push('w_' + this.get('width'));
    }
    if(this.get('crop')){
      variables.push('c_' + this.get('crop'));
    }
    if(this.get('fetch_format')){
      variables.push('f_' + this.get('fetch_format'));
    }
    if(this.get('quality')){
      variables.push('q_' + this.get('quality'));
    }
    if(this.get('radius')){
      variables.push('r_' + this.get('radius'));
    }

    const params = variables.join(",");
    const publicId = this.get('publicId');

    const cloudinaryVideoTag = `https://res.cloudinary.com/${cloudName}/video/upload/${params}/${publicId}`;
//    const cloudinaryVideoTag = Ember.$.cloudinary.video(this.get('publicId'), this.get('options') );
    return Ember.String.htmlSafe(cloudinaryVideoTag);
  }),
});

CloudinaryVideoComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryVideoComponent;
