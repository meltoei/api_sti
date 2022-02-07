console.log('Hello World');
var cron = require('node-cron');
cron.schedule('*/1 * * * * *', function () {
    console.log('running a task every minute');
});