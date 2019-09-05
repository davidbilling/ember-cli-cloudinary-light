import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cloudinary image', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders image', async function (assert) {
    await render(hbs`{{cloudinary-image 'test'}}`);
    assert.dom('img').hasAttribute('src', 'https://res.cloudinary.com/cloudinary-test/image/upload/test');
  });

  test('it renders an image with width and height options', async function (assert) {
    await render(hbs`{{cloudinary-image 'test' (hash width=100 height=100)}}`);

    assert.dom('img').hasAttribute(
      'src',
      'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,w_100/test'
    );
    assert.dom('img').hasAttribute('width', '100');
    assert.dom('img').hasAttribute('height', '100');
  });

  test('it renders an image with width and height options in url and attributes', async function (assert) {
    await render(hbs`{{cloudinary-image 'test' (hash width=100 height=100 crop='fill')}}`);

    assert.dom('img').hasAttribute(
      'src',
      'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,w_100,c_fill/test'
    );
    assert.dom('img').hasAttribute('width', '100');
    assert.dom('img').hasAttribute('height', '100');
  });

  test('it renders an image WHITOUT width and height options attributes for crop= limit', async function (assert) {
    await render(hbs`{{cloudinary-image 'test' (hash height=100 crop='limit')}}`);

    assert.dom('img').hasAttribute(
      'src',
      'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,c_limit/test'
    );
    assert.dom('img').doesNotHaveAttribute('width');
    assert.dom('img').doesNotHaveAttribute('height');
  });
  test('it renders an image WHITOUT width and height options attributes for crop= lfill', async function (assert) {
    await render(hbs`{{cloudinary-image 'test' (hash height=100 crop='lfill')}}`);

    assert.dom('img').hasAttribute(
      'src',
      'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,c_lfill/test'
    );
    assert.dom('img').doesNotHaveAttribute('width');
    assert.dom('img').doesNotHaveAttribute('height');
  });
  test('it renders an image WHITOUT width and height options attributes for crop= fit', async function (assert) {
    await render(hbs`{{cloudinary-image 'test' (hash width=100 height=100 crop='fit')}}`);

    assert.dom('img').hasAttribute(
      'src',
      'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,w_100,c_fit/test'
    );
    assert.dom('img').doesNotHaveAttribute('width');
    assert.dom('img').doesNotHaveAttribute('height');
  });
});