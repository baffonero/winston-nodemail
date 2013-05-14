/*
 * winston-mail.js: Transport for outputting logs to email
 *
 * (C) 2010 Marc Harter
 * MIT LICENCE
 */

var util = require('util');
var os = require('os');
var nodemailer = require('nodemailer');
var winston = require('winston');

/**
 * @constructs Mail
 * @param {object} options hash of options
 */

var Mail = exports.Mail = function (options) {
  options = options || {};

  if(!options.to){
    throw "winston-mail requires 'to' property";
  }

  this.name       = 'mail';
  this.to         = options.to;
  this.from       = options.from       || "winston@" + os.hostname() + ".segment.io";
  this.level      = options.level      || 'info';
  this.silent     = options.silent     || false;

  if (options.nodemailer) {
    this.server     = options.nodemailer
  } else {
    this.server = nodemailer.createTransport("SMTP", {
      host             : options.host,
      secureConnection : options.ssl || options.secure,
      port             : options.port,
      auth: {
        user: options.username,
        pass: options.password
      }
    });
  }

  this.handleExceptions = options.handleExceptions || false;
};

/** @extends winston.Transport */
util.inherits(Mail, winston.Transport);

/**
 * Define a getter so that `winston.transports.MongoDB`
 * is available and thus backwards compatible.
 */
winston.transports.Mail = Mail;

/**
 * Core logging method exposed to Winston. Metadata is optional.
 * @function log
 * @member Mail
 * @param level {string} Level at which to log the message
 * @param msg {string} Message to log
 * @param meta {Object} **Optional** Additional metadata to attach
 * @param callback {function} Continuation to respond to when complete.
 */
Mail.prototype.log = function (level, msg, meta, callback) {
  var self = this;
  if (this.silent) return callback(null, true);

  if (meta) // add some pretty printing
    meta = util.inspect(meta, null, 5)

  var body = meta ?  msg + "\n\n" + meta : msg;

  this.server.sendMail({
      from    : this.from,
      to      : this.to,
      subject : this.subject({level: level, msg: msg.split('\n')[0]}),
      text    : body
  }, function (err, result) {
    console.log(err);
    if (err) self.emit('error', err);
    else self.emit('info', result.message);
    self.emit('logged');
    callback(null, true);
  });
};
