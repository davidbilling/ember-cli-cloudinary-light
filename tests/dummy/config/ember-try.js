'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function () {
  return {
    packageManager: 'npm',
    scenarios: [
      {
        name: 'ember-lts-6.12',
        npm: {
          devDependencies: {
            'ember-source': '~6.12.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
    ],
  };
};
