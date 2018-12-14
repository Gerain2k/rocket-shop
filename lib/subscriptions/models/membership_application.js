let _ = require('underscore')._;
let moment = require('moment');

let MembershipApplication = function(args) {
  _.extend(this, args);

  this.validUntil = this.validUntil
    ? moment(this.validUntil)
    : moment().add(10, 'days');

  this.expired = function() {
    return this.validUntil.isBefore(moment());
  };

  this.emailIsValid = function() {
    return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
  };

  this.heightIsValid = function() {
    return this.height && this.height > 60 && this.height < 75;
  };

  this.ageIsValid = function() {
    return this.age && this.age < 100 && this.age > 15;
  };

  this.weightIsValid = function() {
    return this.weight && this.weight > 100 && this.weight < 300;
  };

  this.nameIsValid = function() {
    return this.first && this.last;
  };
  this.validationMessage = function() {
    let validationMessage = {};
    if (this.isValid()) {
      validationMessage.valid = 'Application is valid';
    }
    if (!this.emailIsValid()) {
      validationMessage.email = 'Email is invalid';
    }
    if (!this.heightIsValid()) {
      validationMessage.height = 'Height is incalid';
    }
    if (!this.ageIsValid()) {
      validationMessage.age = 'Age is invalid';
    }
    if (!this.weightIsValid()) {
      validationMessage.weight = 'Weight is invalid';
    }
    if (!this.nameIsValid()) {
      validationMessage.name = 'Name is invalid';
    }
    return validationMessage;
  };

  this.isValid = function() {
    return (
      this.emailIsValid() &&
      this.heightIsValid() &&
      this.ageIsValid() &&
      this.weightIsValid() &&
      this.nameIsValid() &&
      !this.expired()
    );
  };
};

module.exports = MembershipApplication;
