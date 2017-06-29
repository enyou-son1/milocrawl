var spawn = require('child_process').spawn; //fork一个子进程
var cronJob = require('cron').CronJob;
var path = require('path');
var job = new cronJob('* */4 * * * ',function(){
    //主进程维持定时任务, 子进程执行指定文件中的脚本
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