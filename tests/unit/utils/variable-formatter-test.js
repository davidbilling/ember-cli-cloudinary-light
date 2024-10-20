import variableFormatter from 'dummy/utils/variable-formatter';
import { module, test } from 'qunit';
import { 
  squelchErrorHandlerFor,
  unsquelchAllErrorHandlers
} from 'ember-test-friendly-error-handler';

module('Unit | Utility | variable formatter', function (hooks) {

  hooks.afterEach(() => {
    unsquelchAllErrorHandlers();
  });

  test('it works', function (assert) {
    squelchErrorHandlerFor('Ember.onerror');
    const options = { height: 200 };
    let result = variableFormatter(options);
    assert.strictEqual(result, '/h_200');
  });

  test('it works with more variables', function (assert) {
    squelchErrorHandlerFor('Ember.onerror');
    const options = { height: 200, crop: 'fit' };
    let result = variableFormatter(options);
    assert.strictEqual(result, '/h_200,c_fit');
  });
});
