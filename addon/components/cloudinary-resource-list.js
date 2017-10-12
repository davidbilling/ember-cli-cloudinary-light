import Component from '@ember/component';
import { getOwner } from "@ember/application";
import layout from '../templates/components/cloudinary-resource-list';
import request from 'ember-ajax/request';

const CloudinaryResourceList = Component.extend({
  layout,

  init() {
    this._super(...arguments);

    if (this.get('cloudinaryTag')) {
      this.fetchCloudinaryResourceList().then(
        this.handleCloudinaryResponse.bind(this)
      );
    }
  },

  buildUrl() {
    const cloudName = getOwner(this).resolveRegistration(
      'config:environment'
    ).cloudinary.cloudName;
    const tag = this.get('cloudinaryTag');
    return `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
  },

  fetchCloudinaryResourceList() {
    let url = this.buildUrl();
    return request(url).then(response => {
      return response;
    });
  },

  handleCloudinaryResponse(response) {
    let items = response.resources.sortBy('context.custom.order');
    this.set('items', items);
    return items;
  }
});

CloudinaryResourceList.reopenClass({
  positionalParams: ['cloudinaryTag']
});

export default CloudinaryResourceList;
