import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cloudinary-image', 'Integration | Component | cloudinary image', {
  integration: true
});

test('it renders image', function(assert) {
  this.render(hbs`{{cloudinary-image 'test'}}`);
  assert.equal(this.$('img').attr('src'), 'https://res.cloudinary.com/cloudinary-test/image/upload/test');
});

test('it renders an image with width and height options', function(assert) {
  this.render(hbs`{{cloudinary-image 'test' (hash width=100 height=100)}}`);

  assert.equal(this.$('img').attr('src'), 'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,w_100/test');
  assert.equal(this.$('img').attr('width'), 100);
  assert.equal(this.$('img').attr('height'), 100);
});

test('it renders an image with width and height options in url and attributes', function(assert) {
  this.render(hbs`{{cloudinary-image 'test' (hash width=100 height=100 crop='fill')}}`);

  assert.equal(this.$('img').attr('src'), 'https://res.cloudinary.com/cloudinary-test/image/upload/h_100,w_100,c_fill/test');
  assert.equal(this.$('img').attr('width'), 100);
  assert.equal(this.$('img').attr('height'), 100);
});