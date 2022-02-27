/* โหลด Express มาใช้งาน */
//import connection from "../db/config";
var app = require('express')();
//var mysql = require('mysql2');
const config = require('./db/config');
var bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio')
const { positionList,positionDetail,positionAdd,positionUpdate,positionDelete,positionCheckCode } = require('./service/user');
const { createticket, updateticket, ticketDetailById, buyall, countbuy, checkTicketNumber } = require('./service/ticket');






var listdata;
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'Dduan@it3',
//     database : 'gold'
//   });


/* ใช้ port 7777 หรือจะส่งเข้ามาตอนรัน app ก็ได้ */

var port = process.env.PORT || 7778;
const url = 'https://xn--42cah7d0cxcvbbb9x.com/'


/* Routing */
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.all('*', function (req, res, next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": '*',
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});

app.get("/loginform", (req, res) => {
    tk = ""
    res.sendFile(path.join(__dirname + '/login.html'));

});

app.post('/ticket/buy', function (req, res) {
    // console.log('req.bodylllllllllllllllllllllllllllllllllll');
    // let reqbody = {
    //     ticket_number : ["010100020800"],
    //     code_buy : "0001",
    //     code_scan_door : "0002"

    // };

    let reqbody = req.body;
    const hrtime = process.hrtime();
    let milliSeconds = parseInt(((hrtime[0] * 1e3) + (hrtime[1]) * 1e-6));
    console.log('milliSeconds: ' + milliSeconds);
    var todayDate = new Date().toISOString().slice(0, 10);
    
    var ticket_numberDup = [];
    let n = 1
    reqbody.ticket_number.forEach(ticketNumber => {
        checkTicketNumber(ticketNumber).then(function (dataN) {
         
            if(dataN != ""){
                ticket_numberDup.push(ticketNumber);
            }
        
            if(n == reqbody.ticket_number.length){
              if(ticket_numberDup == ""){
                let ticketAround = ticketNumber.substring(0, 2);
                let ticketType = ticketNumber.substring(2, 4);
                let ticketTransaction = 'SFB' + milliSeconds;
                let ticketPrice = 0;
                if (ticketNumber.substring(8) != '0000') {
                    ticketPrice = ticketNumber.substring(8);
                }

                let dataBuy = {
                    ticket_number: ticketNumber,
                    ticket_transaction: ticketTransaction,
                    ticket_around: ticketAround,
                    ticket_type: ticketType,
                    ticket_price: ticketPrice,
                    ticket_expire: '0',
                    status: '0',
                    stage: '1',
                    code_buy: reqbody.code_buy,
                    code_scan_door: reqbody.code_scan_door,
                    date_match: todayDate
                };

                createticket(dataBuy).then(function () {
                    console.log("ok........");
                    res.json({ 'message': 'ok', 'result': '00' });
                });
              }else{
                //console.log(ticket_numberDup);
                res.json({ 'message': 'บัตรนี้ถูกขายแล้ว', 'result': '02', 'payload': ticket_numberDup });
              }
            }
            n++;        
        });
       

    });

    // reqbody.ticket_number.forEach(ticketNumber => {


        

    //     console.log(dataBuy);
    // });
    // console.log(req.body);
});



app.get('/ticket/scan/:id', function (req, res) {

    let id = req.params.id;
    let status = "";
    let stage = "";

    ticketDetailById(id, status, stage).then(function (data) {

        if (data == "") {
            res.json({ 'message': 'ไม่พบข้อมูลในระบบ', 'result': '01', 'payload': data });
        } else {

            status = "0";
            stage = 1;

            ticketDetailById(id, status, stage).then(function (data1) {

                if (data1 == "") {
                    res.json({ 'message': 'บัตรนี้ถูกใช้งานไปแล้ว', 'result': '02', 'payload': data1 });
                } else {

                    updateticket(2, id).then(function (data2) {
                        //res.json({ 'message': 'ok','result':'00' });
                        if (data1 == "") {
                            res.json({ 'message': 'ไม่สำเร็จ', 'result': '03', 'payload': '' });
                        } else {
                            res.json({ 'message': 'ok', 'result': '00', 'payload': data2 });
                        }
                    });
                }
            });
        }

        //console.log(data);
        //console.log(data[0].code);
        // response.render('index', {data: data});
    });

});

app.get('/user/positiondetail/:id', function (req, res) {

    let userId = req.params.id;
    let status = "0";
    
    if(userId == 0){
        positionList(status).then(function (data1) {
            if (data1 == "") {
                res.json({ 'message': 'ไม่พบข้อมูลในระบบ', 'result': '01', 'payload': data1 });
            } else {
                res.json({ 'message': 'ok', 'result': '00', 'payload': data1 });
            }
        });
        
    }else{
        positionDetail(userId).then(function (data2) {
            if (data2 == "") {
                res.json({ 'message': 'ไม่พบข้อมูลในระบบ', 'result': '01', 'payload': data2 });
            } else {
                res.json({ 'message': 'ok', 'result': '00', 'payload': data2 });
            }
        });
    }
});

app.post('/user/positionadd', function (req, res) {
    
    let reqbody = req.body;
    // let reqbody = {
    //     position_code: "TO011",
    //     position_name: "xxx",
    //     position_status: "0",
    //     userId: "11"
    // }
    positionCheckCode(reqbody.position_code).then(function (data) {

        if (data == "") {
            positionAdd(reqbody).then(function (data1) {
                if (data1) {
                    res.json({ 'message': 'ok', 'result': '00', 'payload': "" });
                }
            });
        } else {
            res.json({ 'message': 'มี position code แล้วในระบบ', 'result': '01', 'payload': data });
        }
    });
});

app.post('/user/positionupdate', function (req, res) {
    
    let reqbody = req.body;
    // let reqbody = {
    //     position_code: "TO010",
    //     position_name: "xxx",
    //     position_status: "0",
    //     userId:1
    // }
    positionCheckCode(reqbody.position_code).then(function (data) {

        if (data == "") {
            positionUpdate(reqbody).then(function (data1) {
                if (data1) {
                    res.json({ 'message': 'ok', 'result': '00', 'payload': "" });
                }
            });
        } else {
            res.json({ 'message': 'มีแล้ position code แล้วในระบบ', 'result': '01', 'payload': data });
        }
    });
});

app.get('/user/positiondelete/:id', function (req, res) {

    let userId = req.params.id;
    
    positionDelete(userId).then(function (data) {
        if (data == "") {
            res.json({ 'message': 'ไม่พบข้อมูลในระบบ', 'result': '01', 'payload': data });
        } else {
            res.json({ 'message': 'ok', 'result': '00', 'payload': "" });
        }
    });
});


///////////////ตัวอย่างการเรียกจากโปรเจคทอง ของสนามวัวยังไม่มี table เก็บ user ////////////////
// app.get('/user', function (req, res) {
//     console.log(req.body);
//     alluser.then(function (data) {
//         res.json({ 'message': 'ok','result':'00', 'payload': data });
//         // response.render('index', {data: data});
//     });


// });

// app.post('/login', function (req, res) {

//     //connection.connect();
//     //config.db.connect();
//     //  config.db.query('SELECT * from admin', function (error, results, fields) {
//     //         if (error) throw error;
//     //         // console.log('The solution is: ', results);
//     //         listdata = results
//     console.log(req.body);
//     //         return listdata;
//     //     });
//     // config.db.end();
//     //connection.end();
//     //res.send('<h1>Hello Node.js</h1>');

//     // listdata = user.getuserlist();
//     // user.login(test);

//     login(req.body.username,req.body.password).then(function (data) {
//         res.json({ 'message': 'ok','result':'00', 'listdata': data });
//         // response.render('index', {data: data});
//     });



// });

// app.post('/user/store', function (req, res) {
//     console.log(req.body);

//     createuser(req.body).then(function (data) {
//         res.json({ 'message': 'ok','result':'00', 'listdata': data });
//         // response.render('index', {data: data});
//     });

// });

// app.post('/user/channel', function (req, res) {
//     console.log(req.body.channel);

//     userlistByChannel(req.body.channel).then(function (data) {
//         //res.json({ 'message': 'ok','result':'00', 'listdata': data });
//         res.json({ 'message': 'ok','result':'00', 'payload': data });
//         // response.render('index', {data: data});
//     });

// });

// app.get('/user/:id/show', function (req, res) {
//     console.log('user id ' + req.params.id);

//     userDetailById(req.params.id).then(function (data) {
//         //res.json({ 'message': 'ok','result':'00', 'listdata': data });
//         res.json({ 'message': 'ok','result':'00', 'payload': data });
//         // response.render('index', {data: data});
//     });

// });

app.get('/ticket/buyall', function (req, res) {
    console.log(".......................");
    //     buyall().then(function (data) {
    // res.json({ 'message': 'ok','result':'00', 'payload': data.length});
    countbuy().then(function (data) {
        res.json({ 'message': 'ok', 'result': '00', 'payload': data });
        // res.json(data);
        // response.render('index', {data: data});
    });
});
app.get('/', function (req, res) {

    res.send('<h1>This is index page</h1>');

});



app.get('/latest', (req, res) => {
    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html)
            date = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(5) > td.span.bg-span.txtd.al-r').text()
            update_time = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(5) > td.em.bg-span.txtd.al-r').text()
            gold_buy = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(3) > td:nth-child(3)').text()
            gold_sell = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()
            goldBar_buy = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(2) > td:nth-child(3)').text()
            goldBar_sell = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(2) > td:nth-child(2)').text()
            res.json({
                status: 'success',
                response: {
                    date: date,
                    update_time: update_time,
                    price: {
                        gold: {
                            buy: gold_buy,
                            sell: gold_sell,
                        },
                        gold_bar: {
                            buy: goldBar_buy,
                            sell: goldBar_sell,
                        },
                    }
                }
            },
                200,
            )
        } else {
            res.json({
                status: 'failure',
                response: 'Service is unavailable, Please try again later.',
            },
                404,
            )
        }
    })
})


/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */

app.listen(port, function () {

    console.log('Starting node.js on port ' + port);

});