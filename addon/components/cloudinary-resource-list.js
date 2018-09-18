import Component from '@ember/component';
import { getOwner } from "@ember/application";
import layout from '../templates/components/cloudinary-resource-list';
import { get } from '@ember/object';
import { set } from '@ember/object';
import fetch from 'fetch';
import { debug } from '@ember/debug';

const CloudinaryResourceList = Component.extend({
  layout,

  init() {
    this._super(...arguments);

    if (get(this, 'cloudinaryTag')) {
      this.fetchCloudinaryResourceList().then(
        this.handleCloudinaryResponse.bind(this)
      ).catch(error => {
        debug(`Error fetching Cloudinary Resource List: ${error}`);
      })
    }
  },

  buildUrl() {
    const cloudName = getOwner(this).resolveRegistration(
      'config:environment'
    ).cloudinary.cloudName;
    const tag = get(this, 'cloudinaryTag');
    return `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
  },

  fetchCloudinaryResourceList() {
    let url = this.buildUrl();
    return fetch(url).then(function(response) {
      return response.json();
    });
  },

  handleCloudinaryResponse(response) {
    let items = response.resources.sortBy('context.custom.order');
    set(this, 'items', items);
    return items;
  }
});

CloudinaryResourceList.reopenClass({
  positionalParams: ['cloudinaryTag']
});

export default CloudinaryResourceList;
