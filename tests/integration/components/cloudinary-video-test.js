import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cloudinary video', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a video', async function (assert) {
    await render(hbs`{{cloudinary-video 'dog'}}`);
    assert.dom('source').hasAttribute('src', 'https://res.cloudinary.com/cloudinary-test/video/upload/dog');
  });
});