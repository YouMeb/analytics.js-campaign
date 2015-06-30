'use strict';

var proto = Data.prototype;

module.exports = Data;

function Data() {
  if (!(this instanceof Data)) {
    return new Data();
  }
}

proto.setCampaign = function (val) {
  this._campaign = val;
  return this;
};

proto.getCampaign = function () {
  return this._campaign || null;
};

proto.toJSON = function () {
  return {
    url: location.href,
    campaign: this.getCampaign()
  };
};
