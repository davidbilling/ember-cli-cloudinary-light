import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cloudinary image', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders image', async function(assert) {
    await render(hbs`{{cloudinary-image 'test'}}`);
    assert.equal(find('img').getAttribute('src'), 'https://res.cloudinary.com/cloudinary-test/image/upload/test');
  });

  test('it renders an image with width and height options', async function(assert) {
    await render(hbs`{{cloudinary-image 'test' (hash width=100 height=100)}}`);

    assert.equal(find('img').getAttribute('src'), 'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,w_100/test');
    assert.equal(find('img').getAttribute('width'), 100);
    assert.equal(find('img').getAttribute('height'), 100);
  });

  test('it renders an image with width and height options in url and attributes', async function(assert) {
    await render(hbs`{{cloudinary-image 'test' (hash width=100 height=100 crop='fill')}}`);

    assert.equal(find('img').getAttribute('src'), 'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,w_100,c_fill/test');
    assert.equal(find('img').getAttribute('width'), 100);
    assert.equal(find('img').getAttribute('height'), 100);
  });

  test('it renders an image WHITOUT width and height options attributes for crop= limit', async function(assert) {
    await render(hbs`{{cloudinary-image 'test' (hash height=100 crop='limit')}}`);

    assert.equal(find('img').getAttribute('src'), 'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,c_limit/test');
    assert.equal(find('img').getAttribute('width'), null);
    assert.equal(find('img').getAttribute('height'), null);
  });
  test('it renders an image WHITOUT width and height options attributes for crop= lfill', async function(assert) {
    await render(hbs`{{cloudinary-image 'test' (hash height=100 crop='lfill')}}`);

    assert.equal(find('img').getAttribute('src'), 'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,c_lfill/test');
    assert.equal(find('img').getAttribute('width'), null);
    assert.equal(find('img').getAttribute('height'), null);
  });
  test('it renders an image WHITOUT width and height options attributes for crop= fit', async function(assert) {
    await render(hbs`{{cloudinary-image 'test' (hash width=100 height=100 crop='fit')}}`);

    assert.equal(find('img').getAttribute('src'), 'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,w_100,c_fit/test');
    assert.equal(find('img').getAttribute('width'), null);
    assert.equal(find('img').getAttribute('height'), null);
  });
});