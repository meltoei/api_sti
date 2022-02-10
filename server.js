
const express = require('express');
const axios = require('axios');
var forms = require('forms');
var moment = require('moment'); // require
const fs = require('fs')
const JsBarcode = require('jsbarcode');
const Canvas = require('canvas');
const cors = require('cors');
var multer = require('multer');

const app = express();
const path = require('path');
const router = express.Router();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');

app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));
app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT || 7780


const folderName = path.join(__dirname + '/fileMs');
//const folderName = './var/tmp/test1';
try {
    if (!fs.existsSync(folderName)) {
        // fs.mkdirSync(folderName)
        fs.mkdir(path.join(__dirname, 'fileMs'), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
    }
    console.log("folder written successfully" + folderName);
} catch (err) {
    console.error(err)
}

// const content = 'Some content!'

// fs.writeFile('./test/test.txt', content, err => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     //file written successfully
//     console.log("file written successfully");
// });

// fs.readFile('./test/test.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data)
// });
app.get("/", (req, res) => {
    var bgname = Date.now();
    res.render('login', { bgname: bgname });
});
app.post('/check', function (req, res) {

    //connection.connect();
    //config.db.connect();
    //  config.db.query('SELECT * from admin', function (error, results, fields) {
    //         if (error) throw error;
    //         // console.log('The solution is: ', results);
    //         listdata = results
    console.log(req.body);
    //         return listdata;
    //     });
    // config.db.end();
    //connection.end();
    //res.send('<h1>Hello Node.js</h1>');

    // listdata = user.getuserlist();
    // user.login(test);

    // login(req.body.username,req.body.password).then(function (data) {
    //     res.json({ 'message': 'ok','result':'00', 'listdata': data });

    // });

    var bgname = Date.now();
    res.redirect('/creatbarcode')
    // res.render('creatbarcode', {bgname:bgname});

});
app.get("/creatbarcode", (req, res) => {
    var bgname = Date.now();
    res.render('creatbarcode', { bgname: bgname });
    //res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/barcode/:taxId', (req, res) => {
    const taxId = req.params.taxId;

    //  for (let i = 0; i < 5; i++) {
    var canvas = new Canvas.createCanvas();
    JsBarcode(canvas, taxId);
    res.contentType('image/png');
    //console.log(canvas.toDataURL())
    res.end(canvas.toBuffer());
    //}

});
app.get('/genbarcode/:taxId', (req, res) => {
    var data = JSON.parse(req.params.taxId);

    console.log(data)
    res.render('genbarcode', { data: data });

});

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {


        callback(null, path.join(__dirname, './public/img'));
    },
    filename: function (req, file, callback) {
        console.log("param");
        console.log(req.params.bgname);
        let exploded_name = file.originalname.split(".");
        let ext = exploded_name[exploded_name.length - 1];
        console.log(exploded_name);
        console.log(ext);
        callback(null, req.params.bgname + "_" + "bg." + ext);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3); //Field name and max count

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
app.post("/api/Upload/:bgname", function (req, res) {
    console.log(req.body)
    const bgname = req.params.bgname;
    req.params.bgname = bgname;
    upload(req, res, function (err) {

        req.params.bgname = req.params.bgname;
        if (err) {
            return res.end("Something went wrong!");
        }
        var data = {
            test: "test",
            bg: req.params.bgname,
            qty: "1",
            around: "01",
            card_type: "01"
        }
        var param = JSON.stringify(data);
      //  res.redirect('/genbarcode/' + param)
      return res.end("File uploaded sucessfully!.");

    });
});


app.get("/q", (req, res) => {

    // res.sendFile(path.join(__dirname+'/index.html'));
    const filedata = [];
    fs.readdir(folderName, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach\
        var r = 1;

        files.forEach(function (file) {

            const data = fs.readFileSync(folderName + '/' + file.toString(), 'utf8');
            filedata[r] = { 'name': file, 'msg': data }

            r++;
        });
        console.log(filedata);
        // console.log(files); 
        res.render('user-list', { userData: filedata });
    });
});



app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/save', (req, res) => {
    const filedata = [];

    var _msDate = moment(req.query.msDate).format('YYYYMMDDHHmm');
    //var num = _msDate-1;
    // console.log(num);
    //  var _msDate = num+"0059";
    // var _msDate1 = moment(num).format('YYYYMMDDHHmmss');
    console.log(_msDate);
    //Displaying the GET data in console
    console.log(req.query);
    //res.send('Check the console');
    // fs.appendFile('test.txt', 'data to append', function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    //   });
    fs.writeFile(folderName + '/' + _msDate + '.txt', req.query.msMessage, err => {
        if (err) {
            console.error(err)
            return
        } else {

            //file written successfully
            console.log("file written successfully");

            // fs.readdir(folderName, function (err, files) {
            //     //handling error
            //     if (err) {
            //         return console.log('Unable to scan directory: ' + err);
            //     }
            //     //listing all files using forEach\
            //     var r = 1;

            //     files.forEach(function (file) {

            //         const data = fs.readFileSync(folderName + '/' + file.toString(), 'utf8');
            //         filedata[r] = { 'name': file, 'msg': data }

            //         r++;
            //     });
            //     console.log(filedata);
            //     // console.log(files); 

            //     res.render('user-list', { userData: filedata });
            // });
            res.redirect('/');
            //  res.sendFile(path.join(__dirname+'/listname.js'));


        }


    });


});
app.get('/delete/:id', (req, res) => {

    console.log('delete id ' + req.params.id);

    const path = folderName + '/' + req.params.id;
    const filedata = [];
    try {
        fs.unlinkSync(path)
        //file removed
    } catch (err) {
        console.error(err)
    }
    fs.readdir(folderName, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach\
        var r = 1;

        files.forEach(function (file) {

            const data = fs.readFileSync(folderName + '/' + file.toString(), 'utf8');
            filedata[r] = { 'name': file, 'msg': data }

            r++;
        });
        console.log(filedata);
        // console.log(files); 
        res.render('user-list', { userData: filedata });
    });
});


app.use('/', router);
//app.use('/users', usersRouter);
app.listen(PORT, () => {

    console.log(`Server is running on port : ${PORT}`);

})
//ทำการ export app ที่เราสร้างขึ้น เพื่อให้สามารถนำไปใช้งานใน project อื่นๆ 
//เปรียบเสมือนเป็น module ตัวนึง
module.exports = app

