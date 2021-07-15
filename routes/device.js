const express = require("express");
const router = express.Router();
const Connection = require("../lib/connection");

router.get("/:serial/:relay/:message", async (req, res, next) => {
  const { serial, relay, message } = req.params;
  const connection = new Connection();
  const result = await connection.device(serial, relay, message);
  res.json(result);
});

module.exports = router;
