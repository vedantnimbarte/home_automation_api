const mysql = require("mysql");

class Connection {
  connectionObj = mysql.createConnection({
    host: "128.199.29.16",
    user: "microtron",
    password: "Pandemic@COVid2021!ngp",
    database: "home_automation",
  });
  constructor() {
    this.connectionObj.connect((error) => {
      if (error) {
        console.error(`Error Connecting to database ${error.stack}`);
        return;
      }
      console.log("Connected as id", this.connectionObj.threadId);
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      this.connectionObj.query(
        `select * from users WHERE email="${email}" AND password="${password}"`,
        (error, results, fields) => {
          if (error) reject("Unable to process the request");
          results.length > 0
            ? resolve({ success: 1, results })
            : resolve({ success: 0, message: "User account not found" });
        }
      );
    });
  }

  updateStatus(id, relay_status) {
    this.connectionObj.query(`UPDATE device_allocation_data SET relay_status = '${relay_status}' WHERE device_allocation_data.id = ${id}; `, (error, results, fields) => {
      console.log(results)
    })
  }

  device(serialId, relay, message, id) {
    return new Promise((resolve, reject) => {
      this.connectionObj.query(
        `SELECT * FROM devices_inventory WHERE serial_no="${serialId}"`,
        (error, results, fields) => {
          if (error) resolve({ success: 0, message: "Request failed" });
          if (results.length > 0) {
            this.updateStatus(id, message)
            resolve({ success: 1, ...results });
          } else {
            resolve({ success: 0, message: "Device not available" });
          }
        }
      );
    });
  }

  getAllDevices() {
    return new Promise((resolve, reject) => {
      this.connectionObj.query(
        `SELECT * FROM devices_inventory`,
        (error, results, fields) => {
          if (error) resolve({ success: 0, message: "Request failed" });
          if (results.length > 0) {
            resolve({ success: 1, results });
          } else {
            resolve({ success: 0, message: "No devices are in the inventory" });
          }
        }
      );
    });
  }

  assignRoomToUser(user, room) {
    return new Promise((resolve, reject) => {
      this.connectionObj.query(
        `INSERT INTO device_allocation_data(serial_no, user_id, room) VALUES('24:0A:C4:F9:2A:2C', '${user}', '${room}')`,
        (error, results, fields) => {
          if (error) {
            resolve({ success: 0, message: "Request failed" });
          }
          if (results.affectedRows > 0) {
            resolve({ success: 1, message: "Room created successfully" });
          } else {
            resolve({ success: 0, message: "Something went wrong" });
          }
        }
      );
    });
  }

  addDeviceToInventory(device, type, no_of_relays, amp, serial, date) {
    console.log(device, type, no_of_relays, amp, serial, date)
    return new Promise((resolve, reject) => {
      this.connectionObj.query(
        `INSERT INTO devices_inventory(device, type, no_of_relays, amp, serial_no, created_at) VALUES('${device}', '${type}', ${no_of_relays}, ${amp}, '${serial}', '${date}')`,
        (error, results, fields) => {
          if (error) {
            resolve({ success: 0, message: "Request failed" });
          }
          console.log(results)
          if (results.affectedRows > 0) {
            resolve({ success: 1, message: "Device added successfully" });
          } else {
            resolve({ success: 0, message: "Something went wrong" });
          }
        }
      );
    });
  }

  getRoomsByUserId(user) {
    return new Promise((resolve, reject) => {
      this.connectionObj.query(
        `SELECT DISTINCT room FROM device_allocation_data WHERE user_id = ${user}`,
        (error, results, fields) => {
          if (error) {
            resolve({ success: 0, message: "Request failed" });
          }
          if (results.length > 0) {
            resolve({ success: 1, results });
          } else {
            resolve({ success: 1, message: "No rooms assigned to the user" });
          }
        }
      );
    });
  }

  getRoomInfo(user, room) {
    return new Promise((resolve, reject) => {
      this.connectionObj.query(
        `SELECT * FROM device_allocation_data WHERE user_id = ${user} AND room = ${room}`,
        (error, results, fields) => {
          if (error) {
            resolve({ success: 0, message: "Request failed" });
          }
          if (results.length > 0) {
            resolve({ success: 1, results });
          } else {
            resolve({ success: 1, message: "No rooms assigned to the user" });
          }
        }
      );
    });
  }

  assignAppliance(
    user,
    appliance,
    switch_status,
    dimmer_status,
    relay,
    room_name,
    device_type,
    serial_id
  ) {
    return new Promise((resolve, reject) => {
      this.connectionObj.query(
        `INSERT INTO device_allocation_data(serial_no, device_type, user_id, room, appliance, switch, dimmer, relay) VALUES ('${serial_id}', '${device_type}', '${user}', '${room_name}', '${appliance}', '${switch_status}', '${dimmer_status}', '${relay}')`,
        (error, results, fields) => {
          if (error) {
            console.log(error)
            resolve({ success: 0, message: "Request failed" });
          }
          console.log(results)

          if (results.affectedRows > 0) {
            resolve({ success: 1, message: "Appliance added successfully" });
          } else {
            resolve({ success: 0, message: "Something went wrong" });
          }
        }
      );
    });
  }
}

module.exports = Connection;
