/* โหลด Express มาใช้งาน */
//import connection from "../db/config";
var app = require('express')();
var mysql = require('mysql');
const config = require('./db/config');
const { alluser, login, createuser,userlistByChannel,userDetailById } = require('./service/user');
var bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio')



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

var port = process.env.PORT || 8000;
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
app.all('*', function(req, res,next) {
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
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});

app.get("/", (req, res) => {
    tk = ""
    res.sendFile(path.join(__dirname + '/login.html'));
});

///////////////ตัวอย่างการเรียกจากโปรเจคทอง ของสนามวัวยังไม่มี table เก็บ user ////////////////
app.get('/user', function (req, res) {
    console.log(req.body);
    alluser.then(function (data) {
        res.json({ 'message': 'ok','result':'00', 'payload': data });
        // response.render('index', {data: data});
    });


});

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


app.get('/index', function (req, res) {

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