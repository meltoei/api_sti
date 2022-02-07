
const express = require('express');
const axios = require('axios');
var forms = require('forms');
var moment = require('moment'); // require
const fs = require('fs')

const app = express();
const path = require('path');
const router = express.Router();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


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

