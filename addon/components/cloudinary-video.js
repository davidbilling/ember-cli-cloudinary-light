import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { htmlSafe } from '@ember/template';
import formatter from '../utils/variable-formatter';
import escapeHtml from '../utils/escape-html';

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
    const cloudName = escapeHtml(
      getOwner(this).resolveRegistration('config:environment').cloudinary
        .cloudName,
    );
    const params = escapeHtml(formatter(this.args.options));
    const publicId = escapeHtml(this.args.publicId);

    const cloudinaryVideoTag = `https://res.cloudinary.com/${cloudName}/video/upload${params}/${publicId}`;
    return htmlSafe(cloudinaryVideoTag);
  }
}
