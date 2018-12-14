let Emitter = require('events').EventEmitter;
let util = require('util');

let ReviewProcess = function(args) {
  let callback;

  //make sure the app is valid
  this.ensureAppValid = function(app) {
    if (app.isValid()) {
      this.emit('validated', app);
    } else {
      //TODO: Would be nice to know what went wrong
      this.emit('invalid', app.validationMessage());
    }
  };
  //find the next mission
  this.findNextMission = function(app) {
    app.mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passangers: []
    };
    this.emit('mission-selected', app);
  };
  //make sure role selected is available
  this.ensureRoleIsAvailable = function(app) {
    this.emit('role-available', app);
  };
  //make sure height/weight/are is right for role
  this.ensureRoleCompatible = function(app) {
    this.emit('role-compatible', app);
  };
  //accept the app with message
  this.acceptAppliction = function(app) {
    callback(null, {
      success: true,
      message: 'Welcome to the Mars Program!'
    });
  };
  //deny the app with message
  this.denyApplication = function(message) {
    callback(null, {
      success: false,
      message: message
    });
  };

  this.processApplication = function(app, next) {
    callback = next;
    this.emit('application-received', app);
  };

  this.on('application-received', this.ensureAppValid);
  this.on('validated', this.findNextMission);
  this.on('mission-selected', this.ensureRoleIsAvailable);
  this.on('role-available', this.ensureRoleCompatible);
  this.on('role-compatible', this.acceptAppliction);

  this.on('invalid', this.denyApplication);
};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;
