import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Pretender from 'pretender';

module('Integration | Component | cloudinary-resource-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.server = new Pretender();
  });

  hooks.afterEach(function () {
    this.server.shutdown();
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
    this.server.get(
      'https://res.cloudinary.com/demo/image/list/test.json',
      () => {
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
        return [
          200,
          {
            'Content-Type': 'application/json',
          },
          JSON.stringify(cloudinaryResourceListResponse),
        ];
      }
    );

    await render(hbs`
      <CloudinaryResourceList @cloudinaryTag='test' as |resourceList|>
        {{#each resourceList.items as |item|}}
          <span>{{item.public_id}}</span>
        {{/each}}
      </CloudinaryResourceList>
    `);

    assert.ok(
      find('span').textContent.trim().endsWith('image_a'),
      'Image A order is OK'
    );
    assert.ok(
      find('span:nth-child(2)').textContent.trim().endsWith('image_b'),
      'Image B order is OK'
    );
    assert.ok(
      find('span:nth-child(3)').textContent.trim().endsWith('image_c'),
      'Image C order is OK'
    );
  });

  test('it fetches images without custom context', async function (assert) {
    this.server.get(
      'https://res.cloudinary.com/demo/image/list/test.json',
      () => {
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
        return [
          200,
          {
            'Content-Type': 'application/json',
          },
          JSON.stringify(cloudinaryResourceListResponse),
        ];
      }
    );

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
