# [mySql相关介绍](https://www.cnblogs.com/hizf/p/MySQL.html)

### 安装

* 可以选择去[官网](https://dev.mysql.com/downloads/)下载安装包一步一步安装下去
* 或者可以使用homebrew来安装 `brew install mysql`
* 安装完成之后，可以`mysql --version`来验证一下是否成功
* mac 上，建议使用homebrew来安装和管理你的软件

### 启动 && 停止

* 安装完成之后，启动mysql `bash mysql.server start`，显示启动成功

### [初始化相关配置](https://blog.csdn.net/cheng649090216/article/details/79246333)

* mysql默认会有root 本机用户名 和guest等 默认的用户名我们一般使用root来进行开发和测试，其他的可以删除不用，或者不管
* 执行 `mysql_secure_installation`,按照提示，一步一步的去输入Y or N ，来配置我们的mysql 密码和删除默认用户，具体自行操作，或者可以参考这篇文章,里面有详情的配置教程

* 停止：mysqladmin -u root -p shutdown


### 登陆 && 修改密码

* `mysql -u root -p` ,因为之前的配置，给mysql设置了密码`123456`,所以需要-p 来输入密码登陆，登陆完成之后，
* `ALTER user 'root'@'localhost' IDENTIFIED BY 'newpassward'`
* 注意，这里的密码要用包含8位大写+小写+特殊字符+数字的密码,如果你之前初始化的时候，要求强校验的时候，按了 "Y"的话


### 基本操作
> mysql的所有命令行需要有 `;`来表示结束，一定要记住，比如 `show databases;`

* 显示所有数据库列表：show databases;
* 建库：create database Mytest；（Mytest库名）
* 打开某个数据库（比如数据库：Mytest)：use Mytest;
* 显示本库中的所有表：show tables; 
* 建表：create table 表名 (字段设定列表)； 
* CREATE TABLE student (id int, name varchar(20));
* 显示某表的结构：describe table1;
* 删库：drop database 库名；
* 删表：drop table 表名；
* 将表中的记录清空：delete from 表名；
* 显示表中的记录：select  *  from 表名；




## node 操作 mysql 数据库

> 建议先下载一个 `navicat for mysql`，可以更加方便的可视化操作我们的数据集，[下载地址](https://xclient.info/s/navicat-for-mysql.html)

![navicat](http://s3.mogucdn.com/mlcdn/c45406/190505_3f598hh13e61k228j5e0bg152kk73_809x416.png)


### navicat for mysql 的使用

* 建立数据库的链接，点击 `connection` 来按要求输入数据的的地址和用户名等，建立连接，mysql默认会有几个数据库在，你可以建立新的自己使用，避免相互污染
* 比如我这里建立了一个 student 的数据库 `CREATE TABLE student (id int, name char(20), url varchar(255), country char(10));`
* 有了表以后，就可以去表里面添加数据了，借助navicat来，点击进去就能添加多条记录了


### node 连接 mysql

```bash
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'suwin'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();

### 报错信息
if (error) throw error;
               ^
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
    at Handshake.Sequence._packetToError (/Users/ocsen/node/Node/NodeSQL/node_modules/mysql/lib/protocol/sequences/Sequence.js:47:14)
    at Handshake.ErrorPacket (/Users/ocsen/node/Node/NodeSQL/node_modules/mysql/lib/protocol/sequences/Handshake.js:123:18)
    at Protocol._parsePacket (/Users/ocsen/node/Node/NodeSQL/node_modules/mysql/lib/protocol/Protocol.js:291:23)
    at Parser._parsePacket (/Users/ocsen/node/Node/NodeSQL/node_modules/mysql/lib/protocol/Parser.js:433:10)
```


* 网上有很多教程链接数据的，但是一般都跑不起来，会有报错
* <div style="color:red;">`Client does not support authentication protocol requested by server; consider upgrading MySQL client`</div>
* [stackoverflow](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server) 问答

* 解决方式：登陆root用户后，在终端或者mysql客户端里面执行以下的查询语句 `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'` password是你自己设置的密码，get, 解决


### 增

```bash

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

```

### 删

```bash
var delSql = 'DELETE FROM student where id = 7';
// 连接 SQL 并实施语句
connection.query(delSql, function (err, res) {
  if (err) {
    console.log("删除错误：");
    console.log(err);
    return;
  } else {
    console.log("删除成功：");
    console.log(res);
  }
});
```

### 改

```bash
// 新增的 SQL 语句及新增的字段信息
let updateSql = "UPDATE student SET name = ?,url = ?,country = ? WHERE Id = ?";
let updateSqlParams = ["子一", "https://taobao.com","中国心", 1];

// 连接 SQL 并实施语句
connection.query(updateSql, updateSqlParams, function (err, res) {
  if (err) {
    console.log("修改错误：");
    console.log(err);
    return;
  } else {
    console.log("修改成功：");
    console.log(res);
  }
});
```

### 查

```bash
// 新增的 SQL 语句及新增的字段信息
let readSql = "SELECT * FROM student";

// 连接 SQL 并实施语句
connection.query(readSql, function (err, res) {
  if (err) throw err;
  console.log(res);
});
```

### END

* 经过一些摸黑的操作，终于能正常操作了，有问题记得google




