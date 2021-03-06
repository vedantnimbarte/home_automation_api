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

router.get("/getLockAssignedToUser", function (req, res, next) {
  const { user_id } = req.query;
  const connection = new Connection();
  connection
    .getSecurityDevices(user_id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.warn(error);
    });
});

router.get("/getRoomsAssignedToUser", function (req, res, next) {
  const { user_id } = req.query;
  console.log(user_id)
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
  const { user_id, appliance, switch_status, dimmer_status, relay, room_name, device_type, serial_no } =
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
      device_type,
      serial_no
    )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/addDeviceToInventory", function (req, res, next) {
  const { device, type, no_of_relays, amp, serial, date } = req.query;
  console.log(req.query)
  const connection = new Connection();
  connection
    .addDeviceToInventory(device, type, no_of_relays, amp, serial, date)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/getAppliancesAssignedToUser", function(req, res, next) {
  const { room, user } = req.query;
  const connection = new Connection();
  connection.getRoomsAssignedToUser(room, user)
  .then((result) => {
    res.json(result);
    });
  
});

module.exports = router;
