import Ember from 'ember';
import formatter from '../utils/variable-formatter';

const CloudinaryVideoComponent = Ember.Component.extend({
  tagName: 'source',
  attributeBindings: ['src'],

  didInsertElement () {
    this._super(...arguments);
    const _this = this;

    this._resizeHandler = function() {
      Ember.run.scheduleOnce('afterRender', this, ()=> {
        if(_this.get('width')){
          _this.set('width', Ember.$('.grid__item').width());
        }
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

  src: Ember.computed('publicId', 'width', 'height', 'crop', 'fetch_format', 'quality', 'radius', function() {
    const cloudName = Ember.getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;
    
    //if matchWidth set to true then set to actual width
    if(this.get('options') && this.get('options.matchWidth') === true){
      if (!this.get('width')) {
        return;
      }
      this.set('options.width', this.get('width'));
    }

    const params = formatter(this.get('options'));
    const publicId = this.get('publicId');

    const cloudinaryVideoTag = `https://res.cloudinary.com/${cloudName}/video/upload${params}/${publicId}`;
    return Ember.String.htmlSafe(cloudinaryVideoTag);
  }),
});

CloudinaryVideoComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryVideoComponent;
