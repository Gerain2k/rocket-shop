let assert = require('assert');
let ReviewProcess = require('../processes/review');
let MembershipApplication = require('../models/membership_application');
let sinon = require('sinon');

describe('The Review Process', function() {
  describe('Receive a valid application', function() {
    let decision;
    let review = new ReviewProcess();
    let validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@user.com',
      age: 30,
      height: 66,
      weight: 180
    });
    let validationSpy = sinon.spy();
    let missionSpy = sinon.spy();
    let roleAvailableSpy = sinon.spy();
    let roleCompatibleSpy = sinon.spy();
    before(function(done) {
      review.on('validated', validationSpy);
      review.on('mission-selected', missionSpy);
      review.on('role-available', roleAvailableSpy);
      review.on('role-compatible', roleCompatibleSpy);
      review.processApplication(validApp, function(err, result) {
        decision = result;
        done();
      });
    });

    it('returns success', function() {
      assert(decision.success, decision.message);
    });
    it('ensure the application is valid', function() {
      assert(validationSpy.called);
    });
    it('selects mission', function() {
      assert(missionSpy.called);
    });
    it('ensure a role exists', function() {
      assert(roleAvailableSpy.called);
    });
    it('ensure a role compatible', function() {
      assert(roleCompatibleSpy.called);
    });
  });
});
