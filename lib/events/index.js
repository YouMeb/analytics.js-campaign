'use strict';

var map = require('component/map');
var getKeys = require('YouMeb/object-keys');
var debug = require('visionmedia/debug')('analytics.js-campaign:events');
var proto = CampaignEvents.prototype;

module.exports = CampaignEvents;

function CampaignEvents(events) {
  if (!(this instanceof CampaignEvents)) {
    return new CampaignEvents(events);
  }
  this.events = objectToEventList(events || {});
}

proto.match = function (url) {
  var i, event;
  var len = this.events.lenth;

  for (i = 0; i < len; i += 1) {
    event = this.events[i];
    debug(event.type);
    if (event.match(url)) {
      return event.type;
    }
  }

  return null;
};

function objectToEventList(events) {
  var keys = getKeys(events);
  return map(keys, function (key) {
    return CampaignEvent(key, events[key]);
  });
}
