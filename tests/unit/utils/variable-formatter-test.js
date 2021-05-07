import variableFormatter from 'dummy/utils/variable-formatter';
import { module, test } from 'qunit';

module('Unit | Utility | variable formatter', function () {
  test('it works', function (assert) {
    const options = { height: 200 };
    let result = variableFormatter(options);
    assert.equal(result, '/h_200');
  });

  test('it works with more variables', function (assert) {
    const options = { height: 200, crop: 'fit' };
    let result = variableFormatter(options);
    assert.equal(result, '/h_200,c_fit');
  });
});
