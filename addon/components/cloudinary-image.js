import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { htmlSafe } from '@ember/template';
import formatter from '../utils/variable-formatter';
import escapeHtml from '../utils/escape-html';
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
    const cloudName = escapeHtml(
      getOwner(this).resolveRegistration('config:environment').cloudinary
        .cloudName,
    );
    const params = escapeHtml(formatter(this.args.options));
    const publicId = escapeHtml(this.args.publicId);

    const image = `https://res.cloudinary.com/${cloudName}/image/upload${params}/${publicId}`;
    return htmlSafe(image);
  }
}
