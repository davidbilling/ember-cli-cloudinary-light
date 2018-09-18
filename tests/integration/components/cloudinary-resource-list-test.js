import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cloudinary-resource-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it gracefully handles ajax errors', async function(assert) {
    await render(hbs`
      {{#cloudinary-resource-list 'test'}}
        template block text
      {{/cloudinary-resource-list}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
