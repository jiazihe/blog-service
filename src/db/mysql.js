const mysql = require('mysql');
const {MYSQL_CONFIG} = require('../config/db');

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect();

// 执行sql语句
const sql = 'select * from blogs where id = 3;';
connection.query(sql, (err, result) => {
    if (err) {
        console.log('error', err);
        return;
    }
    console.log(result);
});

// 回调函数方式，会引起回调地狱，不推荐
// function execSQL(sql, callback) {
//     connection.query(sql, callback);
// }

// promise方式, 推荐
function execSQL(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                // console.log('error', err);
                reject(err);
                return;
            }
            // console.log(result);
            resolve(result);
        });
    });
    return promise;
}


module.exports = {
    execSQL
}