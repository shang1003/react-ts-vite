const mysql = require("mysql2");
// 创建连接池
const connectDatabase = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test",
  connectionLimit: 10, // 连接池中的连接数量限制
  waitForConnections: true, // 当连接池达到限制时，等待可用连接
  queueLimit: 0, // 指定等待队列的最大数量，0表示不限制
});

module.exports.connectDatabase = connectDatabase;
