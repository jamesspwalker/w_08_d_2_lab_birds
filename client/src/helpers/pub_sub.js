const PubSub = {
  publish: function (channel, payload) {
    const event = new CustomEvent(channel, {
      detail: payload
    });
    console.log(`Dispatching on channel ${channel} with payload:\n`, payload)
    document.dispatchEvent(event);
  },

  subscribe: function (channel, callback) {
    console.log(`Subscribing to channel ${channel}`)
    document.addEventListener(channel, callback);
  }
};

module.exports = PubSub;
