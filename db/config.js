const mysql = require('mysql2');
// create the pool
const pool = mysql.createPool(
  {
    host: 'localhost',
    user: 'jittsmgf_myadmin',
    password: 'my@dmin',
    database: 'jittsmgf_bullsdb',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0

  }
);
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();
module.exports = {
  promisePool
}
// query database using promises

