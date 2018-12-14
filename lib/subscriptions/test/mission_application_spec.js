let assert = require('assert');
let MembershipApplication = require('../models/membership_application');

describe('Membership application requierments', function() {
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

  describe('Application is valid if...', function() {
    it('application is valid if all validators return true', function() {
      assert(validApp.isValid(), 'Not valid');
    });
  });
  describe('Applicaiton is invalid if', function() {
    it('is expired', function() {
      let app = new MembershipApplication({
        validUntil: new Date('01/01/2001').toUTCString()
      });
      assert(app.expired());
    });
    it('email is 4 character or less', function() {
      let app = new MembershipApplication({ email: 'd@d' });
      assert(!app.emailIsValid());
    });
    it('email does not have @ symbol', function() {
      let app = new MembershipApplication({ email: 'dd' });
      assert(!app.emailIsValid());
    });
    it('email is omitted', function() {
      let app = new MembershipApplication();
      assert(!app.emailIsValid());
    });
    it('heght is less than 60', function() {
      let app = new MembershipApplication({ height: 59 });
      assert(!app.heightIsValid());
    });
    it('heght is more than 75', function() {
      let app = new MembershipApplication({ height: 76 });
      assert(!app.heightIsValid());
    });
    it('heght is omitted', function() {
      let app = new MembershipApplication();
      assert(!app.heightIsValid());
    });
    it('age is less than 15', function() {
      let app = new MembershipApplication({ age: 14 });
      assert(!app.ageIsValid());
    });
    it('age is more than 100', function() {
      let app = new MembershipApplication({ age: 101 });
      assert(!app.ageIsValid());
    });
    it('age is omitted', function() {
      let app = new MembershipApplication();
      assert(!app.ageIsValid());
    });
    it('age is less than 100', function() {
      let app = new MembershipApplication({ weight: 99 });
      assert(!app.weightIsValid());
    });
    it('age is more than 300', function() {
      let app = new MembershipApplication({ weight: 301 });
      assert(!app.weightIsValid());
    });
    it('age is omitted', function() {
      let app = new MembershipApplication();
      assert(!app.weightIsValid());
    });
    it('first name is omitted', function() {
      let app = new MembershipApplication();
      assert(!app.nameIsValid());
    });
    it('last name is omitted', function() {
      let app = new MembershipApplication();
      assert(!app.nameIsValid());
    });
  });
});
