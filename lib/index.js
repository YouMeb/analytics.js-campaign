'use strict';

var qs = require('component/querystring');
var proto = Campaign.prototype;

module.exports = Campaign;

function Campaign(options) {
  if (!(this instanceof Campaign)) {
    return new Campaign(options);
  }
  options || (options = {});
  this.parameterName = options.parameterName || 'urad_cid';
}

proto.name = 'Campaign';

proto.init = function (analytics, cb) {
  var cid = this.getCID();
  analytics.track('campaign:viewpage', cid);
  cb();
};

proto.getCID = function () {
  var query = getQueryFromUrl(location.href);
  return query[this.parameterName];
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
