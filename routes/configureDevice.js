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

router.get("/getRoomsAssignedToUser", function (req, res, next) {
  const { user_id } = req.query;
  const connection = new Connection();
  connection
    .getRoomsByUserId(user_id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/getRoomInfo", function (req, res, next) {
  const { user_id, room_name } = req.query;
  const connection = new Connection();
  connection
    .getRoomInfo(user_id, room_name)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/assignAppliance", function (req, res, next) {
  const { user_id, appliance, switch_status, dimmer_status, relay, room_name, device_type } =
    req.query;
    console.log(req.query)
  const connection = new Connection();
  connection
    .assignAppliance(
      user_id,
      appliance,
      switch_status,
      dimmer_status,
      relay,
      room_name,
      device_type
    )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
