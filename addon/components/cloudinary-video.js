import Ember from 'ember'; //So far Ember.Handlebars.Utils.escapeExpression is not a Module
import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { htmlSafe } from '@ember/string';
import formatter from '../utils/variable-formatter';

export default class CloudinaryVideoComponent extends Component {
  attributeBindings = ['src', 'width', 'height'];

  get width() {
    if (!this.args.options) {
      return 0;
    }
    return this.args.options.width;
  }

  get height() {
    if (!this.args.options) {
      return 0;
    }
    return this.args.options.height;
  }

  get src() {
    const cloudName = Ember.Handlebars.Utils.escapeExpression(
      getOwner(this).resolveRegistration('config:environment').cloudinary
        .cloudName
    );
    const params = Ember.Handlebars.Utils.escapeExpression(
      formatter(this.args.options)
    );
    const publicId = Ember.Handlebars.Utils.escapeExpression(
      this.args.publicId
    );

    const cloudinaryVideoTag = `https://res.cloudinary.com/${cloudName}/video/upload${params}/${publicId}`;
    return htmlSafe(cloudinaryVideoTag);
  }
}
