import Ember from 'ember';
import formatter from '../utils/variable-formatter';

const { getOwner } = Ember;

export default Ember.Helper.extend({
  compute(params, hash) {
    const cloudName = getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;
    const publicId = Ember.Handlebars.Utils.escapeExpression(params[0]);
    const parameters = formatter(hash);

    if (publicId) {
      return Ember.String.htmlSafe(`background-image: url('https://res.cloudinary.com/${cloudName}/image/upload${parameters}/${publicId}')`);
    }
  }
});