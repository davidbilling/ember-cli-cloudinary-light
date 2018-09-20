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
    response.resources.sort((a, b) => {
      if (!a.context || !a.context.custom || !b.context || !b.context.custom) {
        return;
      }

      let { context: { custom: { order: orderA }}} = a;
      let { context: { custom: { order: orderB }}} = b;

      if (orderA < orderB) {
        return -1;
      }
      if (orderA > orderB) {
        return 1;
      }
      return 0;
    })

    set(this, 'items', response.resources);
    return response.resources;
  }
});

CloudinaryResourceList.reopenClass({
  positionalParams: ['cloudinaryTag']
});

export default CloudinaryResourceList;
