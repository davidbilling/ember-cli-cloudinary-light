import Ember from 'ember'; //So far Ember.Handlebars.Utils.escapeExpression is not a Module
import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { htmlSafe } from '@ember/string';
import formatter from '../utils/variable-formatter';
import { tracked } from '@glimmer/tracking';

export default class CloudinaryImageComponent extends Component {
  @tracked options;

  get alt() {
    if (!this.args.options) {
      return '';
    }

    return this.args.options.alt;
  }

  get width() {
    if (!this.args.options) {
      return 0;
    }
    if (
      this.args.options.crop === 'limit' ||
      this.args.options.crop === 'fit' ||
      this.args.options.crop === 'lfill'
    ) {
      return null;
    }
    return this.args.options.width;
  }

  get height() {
    if (!this.args.options) {
      return 0;
    }
    if (
      this.args.options &&
      (this.args.options.crop === 'limit' ||
        this.args.options.crop === 'fit' ||
        this.args.options.crop === 'lfill')
    ) {
      return null;
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

    const image = `https://res.cloudinary.com/${cloudName}/image/upload${params}/${publicId}`;
    return htmlSafe(image);
  }
}
