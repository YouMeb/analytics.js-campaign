'use strict';

var qs = require('component/querystring');
var debug = require('visionmedia/debug')('analytics.js-campaign');
var Data = require('./data');
var CampaignEvents = require('./events');
var proto = Campaign.prototype;

module.exports = Campaign;

function Campaign(options) {
  if (!(this instanceof Campaign)) {
    return new Campaign(options);
  }
  options || (options = {});
  this._cid = null;
  this.parameterName = options.parameterName || 'urad_cid';
  this.events = CampaignEvents(options.events);
}

proto.name = 'Campaign';

proto.init = function (analytics, cb) {
  debug(this.getCID());
  this.track('entering');
  analytics.on('track:pageview', bind(this, 'onPageView'));
  cb();
};

proto.onPageView = function () {
  var data = Data();
  var eventType = this.events.match(location.pathname);
  if (eventType !== null) {
    this.track(eventType);
  }
};

proto.track = function (event) {
  var data = Data();
  data.setCampaign(this.getCID());
  analytics.track('campaign:' + event, data.toString());
};

proto.getCID = function () {
  if (!this._cid) {
    var query = getQueryFromUrl(location.href);
    this._cid = query[this.parameterName];
  }
  return this._cid;
};

function getQueryFromUrl(url) {
  var querystring = getQueryStringFromUrl(url);
  return qs.parse(querystring);
}

function getQueryStringFromUrl(url) {
  var a = document.createElement('a');
  a.hreh = url;
  return a.search.substr(1);
}
