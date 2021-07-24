const express = require("express");
const router = express.Router();
const Connection = require("../lib/connection");
const MQTT = require("../lib/mqtt");

router.get("/:serial/:relay/:message/:id", async (req, res, next) => {
  const { serial, relay, message, id } = req.params;
  console.log(serial, relay, message)
  const connection = new Connection();
  const results = await connection.device(serial, relay, message, id);
  if (results.success === 1) {
    const Mqtt = new MQTT();
    const result = await Mqtt.Publish(serial, relay, message);

    res.json({ ...result });
  }
});

module.exports = router;
