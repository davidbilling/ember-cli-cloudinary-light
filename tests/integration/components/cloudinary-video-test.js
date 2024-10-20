import { module, test } from 'qunit';
import { setupRenderingTest } from '../../helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { 
  squelchErrorHandlerFor,
  unsquelchAllErrorHandlers
} from 'ember-test-friendly-error-handler';

module('Integration | Component | cloudinary video', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    unsquelchAllErrorHandlers();
  });

  test('it renders a video', async function (assert) {
    squelchErrorHandlerFor('Ember.onerror');
    await render(hbs`<CloudinaryVideo @publicId='dog'/>`);
    assert
      .dom('source')
      .hasAttribute('src', 'https://res.cloudinary.com/demo/video/upload/dog');
  });
});
