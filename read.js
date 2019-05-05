// 连接 MySQL
var mysql = require('mysql');
// MySQL 的连接信息
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'suwin'
});

// 开始连接
connection.connect();

// 新增的 SQL 语句及新增的字段信息
let readSql = "SELECT * FROM student";

// 连接 SQL 并实施语句
connection.query(readSql, function (err, res) {
  if (err) throw err;
  console.log(res);
});
console.log('终止连接');
// 终止连接
connection.end();
