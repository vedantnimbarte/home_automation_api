const mqtt = require("mqtt");

module.exports = class MQTT {
  constructor() {
    this.client = mqtt.connect("mqtt://128.199.29.16");
  }

  Publish = (serialId, relay, message) => {
    console.log(serialId, relay, message)
    return new Promise((resolve, reject) => {
      this.client.on("connect", () => {
        this.client.subscribe(`/${serialId}/${relay}`, (error) => {
          if (!error) {
            this.client.publish(`/${serialId}/${relay}`, `${message}`);
          }
        });
      });
      this.client.on("message", (topic, message) => {
        resolve({ success: 1, topic: topic, message: message.toString() });
        this.client.end();
      });
    });
  };
};
