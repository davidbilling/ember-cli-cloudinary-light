import Ember from 'ember';  //So far Ember.Handlebars.Utils.escapeExpression is not a Module
import Component from '@ember/component';
import { getOwner } from "@ember/application";
import { htmlSafe } from "@ember/string";
import formatter from '../utils/variable-formatter';

export default class CloudinaryVideoComponent extends Component {
  tagName = 'source'
  attributeBindings = ['src', 'width', 'height']

  get width() {
    if (!this.options) {
      return 0;
    }
    return this.options.width;
  }

  get height() {
    if (!this.options) {
      return 0;
    }
    return this.options.height;
  }

  get src() {
    const cloudName = Ember.Handlebars.Utils.escapeExpression(getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName);
    const params = Ember.Handlebars.Utils.escapeExpression(formatter(this.options));
    const publicId = Ember.Handlebars.Utils.escapeExpression(this.publicId);

    const cloudinaryVideoTag = `https://res.cloudinary.com/${cloudName}/video/upload${params}/${publicId}`;
    return htmlSafe(cloudinaryVideoTag);
  }
}