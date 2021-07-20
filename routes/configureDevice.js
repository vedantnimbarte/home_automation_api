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

router.get("/assignRoomToUser", function (req, res, next) {
  const { user_id, room_name } = req.query;
  const connection = new Connection();
  connection
    .assignRoomToUser(user_id, room_name)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
