var spawn = require('child_process').spawn;
var cronJob = require('cron').CronJob;
var path = require('path');
var job = new cronJob('*/10 * * * * ',function(){
    var update = spawn(process.execPath,[path.join(__dirname,'tasks/main.js')]);
    update.stdout.pipe(process.stdout);
    update.stderr.pipe(process.stderr);
    update.on('close',function(code){
        console.log(code);
    });
    update.on('error',function(code){
        console.log(code);
    });
});
job.start();