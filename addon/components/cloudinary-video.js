import Ember from 'ember';
import formatter from '../utils/variable-formatter';

const CloudinaryVideoComponent = Ember.Component.extend({
  tagName: 'source',
  attributeBindings: ['src', 'width', 'height'],

  didInsertElement () {
    this._super(...arguments);
    const _this = this;

    this._resizeHandler = function() {
      Ember.run.scheduleOnce('afterRender', this, ()=> {
        if(Ember.$('.grid__item').width()){
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

  width: Ember.computed.oneWay('options.width'),
  height: Ember.computed.oneWay('options.height'),
  crop: Ember.computed.oneWay('options.crop'),
  fetch_format: Ember.computed.oneWay('options.fetch_format'),
  quality: Ember.computed.oneWay('options.quality'),
  radius: Ember.computed.oneWay('options.radius'),

  src: Ember.computed('publicId', 'width', 'height', 'crop', 'fetch_format', 'quality', 'radius', function() {
    const cloudName = Ember.getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;
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
    return Ember.String.htmlSafe(cloudinaryVideoTag);
  }),
});

CloudinaryVideoComponent.reopenClass({
  positionalParams: ['publicId', 'options']
});

export default CloudinaryVideoComponent;
