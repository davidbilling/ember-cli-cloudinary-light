import Ember from 'ember';  //So far Ember.Handlebars.Utils.escapeExpression is not a Module
import Component from '@ember/component';
import { getOwner } from "@ember/application";
import { htmlSafe } from "@ember/string";
import formatter from '../utils/variable-formatter';
import { tracked } from '@glimmer/tracking';

export default class CloudinaryImageComponent extends Component {
  tagName = 'img'
  attributeBindings = ['src', 'width', 'height']
  @tracked options

  get width() {
    if (!this.options) {
      return 0;
    }
    if (this.options.crop === 'limit' || this.options.crop === 'fit' || this.options.crop === 'lfill') {
      return null;
    }
    return this.options.width;
  }
  get height() {
    if (!this.options) {
      return 0;
    }
    if (this.options && (this.options.crop === 'limit' || this.options.crop === 'fit' || this.options.crop === 'lfill')) {
      return null;
    }
    return this.options.height;
  }

  get src() {
    const cloudName = Ember.Handlebars.Utils.escapeExpression(getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName);
    const params = Ember.Handlebars.Utils.escapeExpression(formatter(this.options));
    const publicId = Ember.Handlebars.Utils.escapeExpression(this.publicId);

    const image = `https://res.cloudinary.com/${cloudName}/image/upload${params}/${publicId}`;
    return htmlSafe(image);
  }
}