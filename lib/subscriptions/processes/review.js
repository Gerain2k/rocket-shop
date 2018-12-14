let async = require('async');
let assert = require('assert');

let ReviewProcess = function(args) {
  assert(args.application, 'Need application to review');
  let app = args.application;

  //make sure the app is valid
  this.ensureAppValid = function(next) {
    if (app.isValid()) {
      next(null, true);
    } else {
      //TODO: Would be nice to know what went wrong
      next(app.validationMessage(), null);
    }
  };
  //find the next mission
  this.findNextMission = function(next) {
    let mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passangers: []
    };
    next(null, mission);
  };
  //make sure role selected is available
  this.ensureRoleIsAvailable = function(next) {
    next(null, true);
  };
  //make sure height/weight/are is right for role
  this.ensureRoleCompatible = function(next) {
    next(null, true);
  };

  this.approveApplication = function(next) {
    next(null, true);
  };

  this.processApplication = function(next) {
    async.series(
      {
        validated: this.ensureAppValid,
        mission: this.findNextMission,
        roleAvailable: this.ensureRoleIsAvailable,
        roleCompatible: this.ensureRoleCompatible,
        success: this.approveApplication
      },
      function(err, result) {
        if (err) {
          next(null, {
            success: false,
            message: err
          });
        } else {
          result.message = 'Welcome to Mars!';
          console.log(result);
          next(null, result);
        }
      }
    );
  };
};

module.exports = ReviewProcess;
