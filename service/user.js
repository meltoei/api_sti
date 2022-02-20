var db = require('mysql');
const config = require('../db/config');

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
var alluser = new Promise(function (resolve, reject) {
    // config.db.connect(function(err) {
    //if (err) throw err;
    config.db.query("SELECT * from user", function (err, result) {
        if (err) throw err;
        resolve(result);
    });
    //});

});


const userlistByChannel = function (channel) {
    console.log('test ............ ' + channel);
    return new Promise(function (resolve, reject) {
        // config.db.connect(function(err) {
        //if (err) throw err;
        var sql = 'SELECT * FROM user WHERE channel = ? ';
        config.db.query(sql,[channel], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
       
    
        // });
        // config.db.end()
    });
}
const userDetailById = function (id) {
    console.log('test ............ ' + id);
    return new Promise(function (resolve, reject) {
        // config.db.connect(function(err) {
        //if (err) throw err;
        var sql = 'SELECT * FROM user WHERE id = ? ';
        config.db.query(sql,[id], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
       
    
        // });
        // config.db.end()
    });
}


const login = function (user, pass) {
    console.log('test ............ ' + user);
    return new Promise(function (resolve, reject) {
        // config.db.connect(function(err) {
        //if (err) throw err;
        var sql = 'SELECT * FROM admin_list WHERE username = ? and password = ?';
        config.db.query(sql,[user,pass], function (err, result, fields) {
            if (err) throw err;
            resolve(result);
        });
       
    
        // });
        // config.db.end()
    });
}

const createuser = function (data) {
    //console.log('test ............ ' + data);
    return new Promise(function (resolve, reject) {
        // config.db.connect(function(err) {
        //if (err) throw err;
        var sql = "INSERT INTO user (name, surname,card_id,address,tel,gender,birthday,password,channel) VALUES (?)";
        {
            
          }
        var values = [
            data.name,
            data.surname,
            data.cardid,
            data.address,
            data.tel,
            data.gender,
            data.birthday,
            data.password,
            data.channel
        ];
        config.db.query(sql, [values], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
       
    
        // });
        // config.db.end()
    });
}
module.exports = {
    alluser,
    login,
    createuser,
    userlistByChannel,
    userDetailById
};