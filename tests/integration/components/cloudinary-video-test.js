import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cloudinary-video', 'Integration | Component | cloudinary video', {
  integration: true
});

test('it renders a video', function(assert) {
  this.render(hbs`{{cloudinary-video 'dog'}}`);
  assert.equal(this.$('source').attr('src'), 'https://res.cloudinary.com/cloudinary-test/video/upload/dog');
});
