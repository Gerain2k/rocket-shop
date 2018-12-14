let assert = require('assert');
let ReviewProcess = require('../processes/review');
let MembershipApplication = require('../models/membership_application');
let sinon = require('sinon');

describe('The Review Process', function() {
  describe('Receive a valid application', function() {
    let decision;

    let validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@user.com',
      age: 30,
      height: 66,
      weight: 180
    });
    let review = new ReviewProcess({ application: validApp });
    sinon.spy(review, 'ensureAppValid');
    sinon.spy(review, 'findNextMission');
    sinon.spy(review, 'ensureRoleIsAvailable');
    sinon.spy(review, 'ensureRoleCompatible');
    before(function(done) {
      review.processApplication(function(err, result) {
        decision = result;
        done();
      });
    });

    it('returns success', function() {
      assert(decision.success, decision.message);
    });
    it('ensure the application is valid', function() {
      assert(review.ensureAppValid.called);
    });
    it('selects mission', function() {
      assert(review.findNextMission.called);
    });
    it('ensure a role exists', function() {
      assert(review.ensureRoleIsAvailable.called);
    });
    it('ensure a role compatible', function() {
      assert(review.ensureRoleCompatible.called);
    });
  });
});
