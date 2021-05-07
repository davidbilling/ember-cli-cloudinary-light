import Component from '@ember/component';
import { getOwner } from '@ember/application';
import fetch from 'fetch';
import { debug } from '@ember/debug';
import { tracked } from '@glimmer/tracking';

export default class CloudinaryResourceList extends Component {
  @tracked items;

  didReceiveAttrs() {
    super.didReceiveAttrs();
    if (this.cloudinaryTag) {
      this.fetchCloudinaryResourceList()
        .then(this.handleCloudinaryResponse.bind(this))
        .catch((error) => {
          debug(`Error fetching Cloudinary Resource List: ${error}`);
        });
    }
  }

  buildUrl() {
    const cloudName = getOwner(this).resolveRegistration('config:environment')
      .cloudinary.cloudName;
    const tag = this.cloudinaryTag;
    return `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
  }

  fetchCloudinaryResourceList() {
    let url = this.buildUrl();
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  handleCloudinaryResponse(response) {
    response.resources.sort((a, b) => {
      if (!a.context || !a.context.custom || !b.context || !b.context.custom) {
        return;
      }

      let {
        context: {
          custom: { order: orderA },
        },
      } = a;
      let {
        context: {
          custom: { order: orderB },
        },
      } = b;

      if (orderA < orderB) {
        return -1;
      }
      if (orderA > orderB) {
        return 1;
      }
      return 0;
    });

    this.items = response.resources;
    return response.resources;
  }
}
