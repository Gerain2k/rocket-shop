let assert = require('assert');
let MembershipApplication = require('../models/membership_application');

describe('New user signuo', function() {
  let validApp;

  before(function() {
    validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@user.com',
      age: 30,
      height: 66,
      weight: 180
    });
  });

  describe('Using valid email, first, last names, heught, age, weight', function() {
    it('is valid', function() {});
    it('reports a valid email');
    it('reports a valid height');
    it('reports a valid age');
    it('reports a valid weight');
    it('reports a valid name');
  });
});
