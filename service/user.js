const db = require('../db/config');

// var listdata;


// //res.send('<h1>Hello Node.js</h1>');

// async function getuserlist() {
//    // config.db.connect();

//     var getuserlist = config.db.query('SELECT * from admin', function (error, results) {
//         if (error) throw error;
//        // console.log('The solution is: ', results);
//      //   listdata = results;
//      listdata = results;
//      return listdata;
//      //   config.db.end();

//     });




// }

// module.exports = {
//     getuserlist
// };
// var alluser = new Promise(function (resolve, reject) {
//     // config.db.connect(function(err) {
//     //if (err) throw err;
//     config.db.query("SELECT * from user", function (err, result) {
//         if (err) throw err;
//         resolve(result);
//     });
//     //});

// });


// const userlistByChannel = function (channel) {
//     console.log('test ............ ' + channel);
//     return new Promise(function (resolve, reject) {
//         // config.db.connect(function(err) {
//         //if (err) throw err;
//         var sql = 'SELECT * FROM user WHERE channel = ? ';
//         config.db.query(sql,[channel], function (err, result) {
//             if (err) throw err;
//             resolve(result);
//         });
       
    
//         // });
//         // config.db.end()
//     });
// }
// const userDetailById = function (id) {
//     console.log('test ............ ' + id);
//     return new Promise(function (resolve, reject) {
//         // config.db.connect(function(err) {
//         //if (err) throw err;
//         var sql = 'SELECT * FROM user WHERE id = ? ';
//         config.db.query(sql,[id], function (err, result) {
//             if (err) throw err;
//             resolve(result);
//         });
       
    
//         // });
//         // config.db.end()
//     });
// }


// const login = function (user, pass) {
//     console.log('test ............ ' + user);
//     return new Promise(function (resolve, reject) {
//         // config.db.connect(function(err) {
//         //if (err) throw err;
//         var sql = 'SELECT * FROM admin_list WHERE username = ? and password = ?';
//         config.db.query(sql,[user,pass], function (err, result, fields) {
//             if (err) throw err;
//             resolve(result);
//         });
       
    
//         // });
//         // config.db.end()
//     });
// }

// const createuser = function (data) {
//     //console.log('test ............ ' + data);
//     return new Promise(function (resolve, reject) {
//         // config.db.connect(function(err) {
//         //if (err) throw err;
//         var sql = "INSERT INTO user (name, surname,card_id,address,tel,gender,birthday,password,channel) VALUES (?)";
//         {
            
//           }
//         var values = [
//             data.name,
//             data.surname,
//             data.cardid,
//             data.address,
//             data.tel,
//             data.gender,
//             data.birthday,
//             data.password,
//             data.channel
//         ];
//         config.db.query(sql, [values], function (err, result) {
//             if (err) throw err;
//             resolve(result);
//         });
       
    
//         // });
//         // config.db.end()
//     });
// }

const positionList = async function (status) {

    var sql = 'SELECT * FROM sti_position WHERE position_status = ?';

    const [rows, fields] = await db.promisePool.query(sql, [status]);
    return rows;
}

const positionDetail = async function (id) {
    var sql = 'SELECT * FROM sti_position WHERE id = ?';

    const [rows, fields] = await db.promisePool.query(sql, [id]);
    return rows;
}

const positionCheckCode = async function (position_code) {
    var sql = 'SELECT * FROM sti_position WHERE position_code = ?';

    const [rows, fields] = await db.promisePool.query(sql, [position_code]);
    return rows;
}

const positionAdd = async function (data) {
  
    var sql = "INSERT INTO sti_position(position_code,position_name,position_status) VALUES (?)";

    var values = [
        data.position_code,
        data.position_name,
        data.position_status,
        data.userId
    ];

    const [rows, fields] = await db.promisePool.query(sql, [values]);
    console.log(rows);
    return rows;
}

const positionUpdate = async function (data) {
  
    var sql = "UPDATE sti_position SET position_code = ? ,position_name = ? ,position_status = ? Where id = ?";

    const [rows, fields] = await db.promisePool.query(sql, [data.position_code, data.position_name, data.position_status, data.userId]);
    return rows;
}

const positionDelete = async function (id) {
  
    var sql = "UPDATE sti_position SET position_status = 2 Where id = ?";

    const [rows, fields] = await db.promisePool.query(sql, [id]);
    return rows;
}


module.exports = {
    positionAdd,
    positionUpdate,
    positionDelete,
    positionCheckCode,
    positionList,
    positionDetail
};