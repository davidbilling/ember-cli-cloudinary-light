import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'dummy/config/environment';
import Ember from 'ember';
import buildErrorHandler from 'ember-test-friendly-error-handler';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

Ember.onerror = buildErrorHandler('Ember.onerror', (reason) => {
  throw reason;
  // reportErrorToService(reason);

  // whatever else you might want here...
});

loadInitializers(App, config.modulePrefix);
