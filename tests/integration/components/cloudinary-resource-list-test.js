import { module, test } from 'qunit';
import { setupRenderingTest } from '../../helpers';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Pretender from 'pretender';
import {
  squelchErrorHandlerFor,
  unsquelchAllErrorHandlers,
} from 'ember-test-friendly-error-handler';

module('Integration | Component | cloudinary-resource-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.server = new Pretender();
    // Store original fetch
    this.originalFetch = window.fetch;
  });

  hooks.afterEach(function () {
    unsquelchAllErrorHandlers();
    this.server.shutdown();
    // Restore original fetch
    if (this.originalFetch) {
      window.fetch = this.originalFetch;
    }
  });

  test('it gracefully handles fetch error', async function (assert) {
    await render(hbs`
      <CloudinaryResourceList @cloudinaryTag='test' as |resourceList|>
        it renders block content 
        <span>{{resourceList.public_id}}</span>
      </CloudinaryResourceList>
    `);

    assert.dom(this.element).hasText('it renders block content');
  });

  test('it renders cloudinary response in correct order', async function (assert) {
    squelchErrorHandlerFor('Ember.onerror');

    // Mock fetch directly
    window.fetch = (url) => {
      assert.step(`fetch called with: ${url}`);
      if (url === 'https://res.cloudinary.com/demo/image/list/test.json') {
        let cloudinaryResourceListResponse = {
          resources: [
            {
              public_id: 'my_project/image_b',
              version: 1509653786,
              format: 'jpg',
              width: 2100,
              height: 1400,
              type: 'upload',
              created_at: '2017-11-02T14:06:53Z',
              context: {
                custom: {
                  caption: 'Image B',
                  order: '02',
                },
              },
            },
            {
              public_id: 'my_project/image_c',
              version: 1509653789,
              format: 'jpg',
              width: 2100,
              height: 1400,
              type: 'upload',
              created_at: '2017-11-02T14:06:53Z',
              context: {
                custom: {
                  caption: 'Image C',
                  order: '03',
                },
              },
            },
            {
              public_id: 'my_project/image_a',
              version: 1509653787,
              format: 'jpg',
              width: 2100,
              height: 1400,
              type: 'upload',
              created_at: '2017-11-02T14:06:52Z',
              context: {
                custom: {
                  caption: 'Image A',
                  order: '01',
                },
              },
            },
          ],
          updated_at: '2017-11-03T13:16:29Z',
        };
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(cloudinaryResourceListResponse),
        });
      }
      return Promise.reject(new Error('Unexpected URL'));
    };

    await render(hbs`
      <CloudinaryResourceList @cloudinaryTag='test' as |resourceList|>
        <div class="debug">Items: {{resourceList.items.length}}</div>
        {{#each resourceList.items as |item|}}
          <span>{{item.public_id}}</span>
        {{/each}}
      </CloudinaryResourceList>
    `);

    assert.verifySteps([
      'fetch called with: https://res.cloudinary.com/demo/image/list/test.json',
    ]);

    const debugText = find('.debug').textContent;
    assert.ok(
      debugText.includes('3'),
      `Should have 3 items, got: ${debugText}`,
    );

    const firstSpan = find('span');
    assert.ok(firstSpan, 'First span should exist');

    if (firstSpan) {
      assert.ok(
        firstSpan.textContent.trim().endsWith('image_a'),
        `Image A order is OK, got: ${firstSpan.textContent.trim()}`,
      );
    }

    const secondSpan = find('.debug + span + span');
    if (secondSpan) {
      assert.ok(
        secondSpan.textContent.trim().endsWith('image_b'),
        `Image B order is OK, got: ${secondSpan.textContent.trim()}`,
      );
    } else {
      assert.ok(false, 'Second span not found');
    }

    const thirdSpan = find('.debug + span + span + span');
    if (thirdSpan) {
      assert.ok(
        thirdSpan.textContent.trim().endsWith('image_c'),
        `Image C order is OK, got: ${thirdSpan.textContent.trim()}`,
      );
    } else {
      assert.ok(false, 'Third span not found');
    }
  });

  test('it fetches images without custom context', async function (assert) {
    squelchErrorHandlerFor('Ember.onerror');

    // Mock fetch directly
    window.fetch = (url) => {
      if (url === 'https://res.cloudinary.com/demo/image/list/test.json') {
        let cloudinaryResourceListResponse = {
          resources: [
            {
              public_id: 'image_a',
              version: 1476216440,
              format: 'png',
              width: 500,
              height: 500,
              type: 'upload',
              created_at: '2016-10-11T20:07:20Z',
            },
            {
              public_id: 'image_b',
              version: 1476216439,
              format: 'png',
              width: 500,
              height: 500,
              type: 'upload',
              created_at: '2016-10-11T20:07:19Z',
            },
          ],
          updated_at: '2018-09-19T15:56:04Z',
        };
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(cloudinaryResourceListResponse),
        });
      }
      return Promise.reject(new Error('Unexpected URL'));
    };

    await render(hbs`
      <CloudinaryResourceList @cloudinaryTag='test' as |resourceList|>
        {{#each resourceList.items as |item|}}
          <span id="{{item.public_id}}">Resource {{item.public_id}}</span>
        {{/each}}
      </CloudinaryResourceList>
    `);

    assert.dom('#image_a').exists('image_a exists');
    assert.dom('#image_b').exists('image_b exists');
  });
});
