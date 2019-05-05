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
let addSql = "INSERT INTO student(id,name,url,country) VALUES(?,?,?,?)";
let addSqlParams = ["7", "蘑菇", "http://mogujie.com", "刚果"];

// 连接 SQL 并实施语句
connection.query(addSql, addSqlParams, function (err, res) {
  if (err) {
    console.log("新增错误：");
    console.log(err);
    return;
  } else {
    console.log("新增成功：");
    console.log(res);
  }
});

// 终止连接
connection.end();