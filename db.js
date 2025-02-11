const mysql = require("mysql2");

// สร้างการเชื่อมต่อฐานข้อมูล
const db = mysql.createPool({
    host: "localhost",  // แก้ไขจาก "localhot" เป็น "localhost"
    user: "root",
    password: "",
    database: "up_food"
}).promise();

// ส่งออกการเชื่อมต่อฐานข้อมูล
module.exports = db;
