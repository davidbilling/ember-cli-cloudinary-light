import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { debug } from '@ember/debug';
import { tracked } from '@glimmer/tracking';

export default class CloudinaryResourceList extends Component {
  @tracked _items = [];

  constructor(owner, args) {
    super(owner, args);

    if (this.args.cloudinaryTag) {
      this.fetchCloudinaryResourceList()
        .then(this.handleCloudinaryResponse.bind(this))
        .catch((error) => {
          debug(`Error fetching Cloudinary Resource List: ${error}`);
        });
    }
  }

  get items() {
    return this._items;
  }

  buildUrl() {
    const cloudName =
      getOwner(this).resolveRegistration('config:environment').cloudinary
        .cloudName;
    const tag = this.args.cloudinaryTag;
    return `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
  }

  fetchCloudinaryResourceList() {
    let url = this.buildUrl();
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  handleCloudinaryResponse(response) {
    if (!response || !response.resources) {
      debug('Invalid response from Cloudinary');
      return;
    }

    response.resources.sort((a, b) => {
      if (!a.context || !a.context.custom || !b.context || !b.context.custom) {
        return 0;
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

    this._items = response.resources;
  }
}
