import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';
import { htmlSafe } from '@ember/template';
import formatter from '../utils/variable-formatter';
import escapeHtml from '../utils/escape-html';

export default class SafeCloudinaryUrlHelper extends Helper {
  compute(params, hash) {
    const cloudName = escapeHtml(
      getOwner(this).resolveRegistration('config:environment').cloudinary
        .cloudName,
    );
    const publicId = escapeHtml(params[0]);
    const parameters = escapeHtml(formatter(hash));

    if (publicId) {
      return htmlSafe(
        "background-image: url('https://res.cloudinary.com/" +
          cloudName +
          '/image/upload' +
          parameters +
          '/' +
          publicId +
          "')",
      );
    }
  }
}
