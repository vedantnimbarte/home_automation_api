const express = require("express");
const Connection = require("../lib/connection");
const router = express.Router();

router.get("/getAllDevices", function (req, res, next) {
  const connection = new Connection();
  connection
    .getAllDevices()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
