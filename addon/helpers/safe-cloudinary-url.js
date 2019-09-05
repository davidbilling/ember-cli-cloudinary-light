import Ember from 'ember';  //So far Ember.Handlebars.Utils.escapeExpression is not a Module
import Helper from '@ember/component/helper';
import { getOwner } from "@ember/application"
import { htmlSafe } from "@ember/string"
import formatter from '../utils/variable-formatter';

export default Helper.extend({
  compute(params, hash) {
    const cloudName = Ember.Handlebars.Utils.escapeExpression(getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName);
    const publicId = Ember.Handlebars.Utils.escapeExpression(params[0]);
    const parameters = Ember.Handlebars.Utils.escapeExpression(formatter(hash));

    if (publicId) {
      return htmlSafe("background-image: url('https://res.cloudinary.com/" + cloudName + "/image/upload" + parameters + "/" + publicId + "')");
    }
  }
});