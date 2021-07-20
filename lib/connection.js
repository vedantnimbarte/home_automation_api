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

  device(serialId, relay, message) {
    return new Promise((resolve, reject) => {
      this.connectionObj.query(
        `SELECT * FROM devices_inventory WHERE serial_no="${serialId}"`,
        (error, results, fields) => {
          if (error) resolve({ success: 0, message: "Request failed" });
          if (results.length > 0) {
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
        `INSERT INTO device_allocation_data(user_id, room) VALUES('${user}', '${room}')`,
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
}

module.exports = Connection;
