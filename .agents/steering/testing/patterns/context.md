# Testing Patterns
Keywords: qunit, test, integration, unit, render, assert

## Test Framework

Uses QUnit with ember-qunit helpers:
- Integration tests: Component rendering tests
- Unit tests: Utility function tests

## Integration Test Pattern

```javascript
import { module, test } from 'qunit';
import { setupRenderingTest } from '../../helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import {
  squelchErrorHandlerFor,
  unsquelchAllErrorHandlers,
} from 'ember-test-friendly-error-handler';

module('Integration | Component | component-name', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    unsquelchAllErrorHandlers();
  });

  test('it renders', async function (assert) {
    squelchErrorHandlerFor('Ember.onerror');
    await render(hbs`<ComponentName @publicId='test'/>`);

    assert.dom('img').hasAttribute('src', 'expected-value');
  });
});
```

## Unit Test Pattern

```javascript
import { module, test } from 'qunit';
import utilityFunction from 'dummy/utils/utility-function';

module('Unit | Utility | utility-name', function (hooks) {
  hooks.afterEach(() => {
    unsquelchAllErrorHandlers();
  });

  test('it works', function (assert) {
    squelchErrorHandlerFor('Ember.onerror');
    let result = utilityFunction({ option: 'value' });
    assert.strictEqual(result, 'expected');
  });
});
```

## Error Handler Pattern

Uses `ember-test-friendly-error-handler` to manage Ember.onerror during tests:
- `squelchErrorHandlerFor('Ember.onerror')` - Suppress errors for test
- `unsquelchAllErrorHandlers()` - Restore in afterEach

## Assertion Patterns

- `assert.dom('selector').hasAttribute('attr', 'value')` - Check attributes
- `assert.dom('selector').doesNotHaveAttribute('attr')` - Negative check
- `assert.strictEqual(actual, expected)` - Value equality

## Test Configuration

Dummy app provides test environment config in `tests/dummy/config/environment.js`:
```javascript
cloudinary: {
  cloudName: 'demo',
}
```

## Commands

```bash
npm test              # Run all linting and tests
npm run test:ember    # Run ember tests only
npm run lint          # Run linting only
```

## Rules
- MUST: Use `setupRenderingTest` for component tests
- MUST: Clean up error handlers in `afterEach`
- MUST: Use `strictEqual` for value assertions
- PREFER: `qunit-dom` assertions over manual DOM queries
- AVOID: Testing implementation details, focus on observable behavior

## References
- Key files: tests/integration/components/*.js, tests/unit/utils/*.js
- Related contexts: core/patterns/context.md
