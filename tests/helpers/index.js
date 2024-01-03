import {
  setupApplicationTest,
  setupRenderingTest,
  setupTest,
} from 'ember-qunit';

// This file exists to provide wrappers around ember-qunit's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

// function mySetupApplicationTest(hooks, options) {
//   setupApplicationTest(hooks, options);

//   // Additional setup for application tests can be done here.
//   //
//   // For example, if you need an authenticated session for each
//   // application test, you could do:
//   //
//   // hooks.beforeEach(async function () {
//   //   await authenticateSession(); // ember-simple-auth
//   // });
//   //
//   // This is also a good place to call test setup functions coming
//   // from other addons:
//   //
//   // setupIntl(hooks); // ember-intl
//   // setupMirage(hooks); // ember-cli-mirage
// }

// function mySetupRenderingTest(hooks, options) {
//   setupRenderingTest(hooks, options);

//   // Additional setup for rendering tests can be done here.
// }

// function mySetupTest(hooks, options) {
//   setupTest(hooks, options);

//   // Additional setup for unit tests can be done here.
// }

export { setupApplicationTest, setupRenderingTest, setupTest };
