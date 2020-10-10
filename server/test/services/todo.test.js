const assert = require('assert');
const app = require('../../src/app');

describe('\'todo\' service', () => {
  it('registered the service', () => {
    const service = app.service('todo');

    assert.ok(service, 'Registered the service');
  });
});
