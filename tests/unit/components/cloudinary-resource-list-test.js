import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const cloudName = 'demo';

module('Unit | Component | cloudinary-resource-list', function (hooks) {
  setupTest(hooks);

  // Specify the other units that are required for this test.
  // needs: []
  hooks.beforeEach(function () {
    this.owner.register('config:environment', {
      cloudinary: { cloudName },
    });
  });

  test('Cloudinary URL is composed correctly', function (assert) {
    let component = this.owner
      .factoryFor('component:cloudinary-resource-list')
      .create();

    let tag = 'test';
    component.set('cloudinaryTag', tag);

    let url = component.buildUrl();
    assert.expect(
      url,
      `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`,
      'Url is OK'
    );
  });

  test('Response is sorted correctly', function (assert) {
    let component = this.owner
      .factoryFor('component:cloudinary-resource-list')
      .create();

    let response = {
      resources: A([
        { publid_id: 1, context: { custom: { order: 3 } } },
        { publid_id: 2, context: { custom: { order: 2 } } },
        { publid_id: 3, context: { custom: { order: 1 } } },
      ]),
    };

    let orderedItems = component.handleCloudinaryResponse(response);
    assert.expect(orderedItems[0].publid_id, 3, 'Resource items order is OK');
  });
});
