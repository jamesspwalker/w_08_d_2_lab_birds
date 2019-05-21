const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Sightings.prototype.bindEvents = function () {
  PubSub.subscribe('SightingView:sighting-delete-clicked', (evt) => {
    this.deleteSighting(evt.detail);
  });
  // console.log('Binding model events') DEFINITELY HITS
  PubSub.subscribe('SightingFormView:submitted-sighting', (evt) => {
    console.log('HELLO WORLD bindEvents');
    this.postSighting(evt.detail);
  });
};

Sightings.prototype.getData = function () {
  this.request.get()
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.postSighting = function (sighting) {
  this.request.post(sighting)
  .then((sightings) => {
    PubSub.publish('Sightings:data-loaded', sightings)
  })
  .catch(console.error)
  console.log("HELLO WORLD")
};

Sightings.prototype.deleteSighting = function (sightingId) {
  this.request.delete(sightingId)
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};



module.exports = Sightings;
