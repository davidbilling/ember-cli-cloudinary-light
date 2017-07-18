import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const cloudName = 'test-cloud';

moduleFor(
  'component:cloudinary-resource-list',
  'Unit | Component | cloudinary-resource-list',
  {
    // Specify the other units that are required for this test.
    // needs: []
    beforeEach() {
      this.register('config:environment', {
        cloudinary: { cloudName }
      });
    }
  }
);

test('Cloudinary URL is composed correctly', function(assert) {
  let component = this.subject();

  let tag = 'my-tag';
  component.set('cloudinaryTag', tag);

  let url = component.buildUrl();
  assert.equal(
    url,
    `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`,
    'Url is OK'
  );
});

test('Response is sorted correctly', function(assert) {
  let component = this.subject();

  let response = {
    resources: Ember.A([
      { publid_id: 1, context: { custom: { order: 3 } } },
      { publid_id: 2, context: { custom: { order: 2 } } },
      { publid_id: 3, context: { custom: { order: 1 } } }
    ])
  };

  let orderedItems = component.handleCloudinaryResponse(response);
  assert.equal(orderedItems[0].publid_id, 3, 'Resource items order is OK');
});
