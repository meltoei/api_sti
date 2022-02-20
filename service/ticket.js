var db = require('mysql');
const config = require('../db/config');


const ticketDetailById = function (id, status, stage) {
    //console.log('test ............ ' + id);
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT * FROM sti_ticket_transaction WHERE id = ?';

        if (status != "") {
            sql += ' AND status = ' + status;
        }

        if (stage != "") {
            sql += ' AND stage = ' + stage;
        }
        console.log('test ............ ' + sql)
        config.db.query(sql, [id], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}

// module.exports = {
//     getuserlist
// };


const buyall =  function () {
    return new Promise( async function (resolve, reject) {
        // config.db.connect(function(err) {
        //if (err) throw err;
        //await  config.db.connect();
        await config.db.query("SELECT * from sti_ticket_transaction order by id desc LIMIT 0,10 ", function (err, result) {
            if (err) throw err;
            resolve(result);
        });
      //  await config.db.end();

        //});

        //  })
    });
}

var buyall1 = new Promise(function (resolve, reject) {
    // config.db.connect(function(err) {
    //if (err) throw err;
    config.db.query("SELECT * from sti_ticket_transaction", function (err, result) {
        if (err) throw err;
        resolve(result);
    });
    //});

});


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



// // var login = new Promise(function(resolve, reject){
// //     config.db.connect(function(err) {
// //       if (err) throw err;
// //       config.db.query("SELECT * from admin", function (err, result, fields) {
// //         if (err) throw err;
// //           resolve(result);
// //       });
// //     });
// //     config.db.end()
// // });
// // exports.method = function() {};
// // exports.otherMethod = function() {};
// const login = function (user, pass) {
//     console.log('test ............ ' + user);
//     return new Promise(function (resolve, reject) {
//         // config.db.connect(function(err) {
//         //if (err) throw err;
//         var sql = 'SELECT * FROM admin WHERE username = ? and password = ?';
//         config.db.query(sql,[user,pass], function (err, result, fields) {
//             if (err) throw err;
//             resolve(result);
//         });


//         // });
//         // config.db.end()
//     });
// }

const createticket = function (data) {
    console.log('test ............ ' + data);
    return new Promise(async function (resolve, reject) {
        //config.db.connect(function(err) {
        //  if (err) throw err;
        var sql = "INSERT INTO sti_ticket_transaction (ticket_number,ticket_transaction,ticket_around,ticket_type,ticket_price,ticket_expire,status,stage,code_buy,code_scan_door,date_match) VALUES (?)";

        var values = [
            data.ticket_number,
            data.ticket_transaction,
            data.ticket_around,
            data.ticket_type,
            data.ticket_price,
            data.ticket_expire,
            data.status,
            data.stage,
            data.code_buy,
            data.code_scan_door,
            data.date_match
        ];
       //  config.db.connect();
         config.db.query(sql, [values], function (err, result) {
            console.log(result);
            if (err) throw err;
            console.log("1 record inserted");
            resolve(result);
        }
        );

     //    config.db.end();
       //  return;
        // }
        //   );
        // config.db.end();
    });

}

const updateticket = function (stage, id) {
    //console.log('test ............ ' + data);
    return new Promise(function (resolve, reject) {

        var sql = "UPDATE sti_ticket_transaction SET stage = ? Where id = ?";

        config.db.query(sql, [stage, id], function (err, row, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}

module.exports = {
    createticket,
    updateticket,
    ticketDetailById,
    buyall
};