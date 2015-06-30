'use strict';

var proto = CampaignEvent.prototype;

module.exports = CampaignEvent;

function CampaignEvent(pagere, type) {
  if (!(this instanceof CampaignEvent)) {
    return new CampaignEvent(pagere, type);
  }
  this.re = new RegExp(pagere);
  this.type = type;
}

proto.match = function (url) {
  return this.re.test(url);
};
