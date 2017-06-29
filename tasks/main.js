/**
 * Created by sunyanyang on 17/6/18.
 */
let read = require('./read');
let write = require('./write');
let lrc = require('./lrc');
let async = require('async');
let Song = require('../model').Song;
let debug = require('debug')('crawl:main');
debug('开始计划任务');
let domain = 'http://music.163.com/#';
let ranks = [
                //{pathinfo:'/discover/toplist?id=27135204', rank:'法国周榜'},

                //{pathinfo:'/discover/toplist?id=180106',   rank:'UK排行榜周榜'},

                //{pathinfo:'/discover/toplist?id=60198',    rank:'美国Billboard周榜'},

                //{pathinfo:'/discover/toplist?id=745956260',rank:'韩语榜'},

                //{pathinfo:'/discover/toplist?id=10520166',rank:'云音乐电音榜'},

                {pathinfo:'/discover/toplist?id=71385702', rank:'ACG音乐榜'},

                {pathinfo:'/discover/toplist?id=60131',    rank:'日本Oricon周榜'}
            ];

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

Array.prototype.doublePick = function doublePick() {
    if(this.length < 2){
        return this;
    }
    var tmp = rnd(0, this.length-1), tmp2;
    do{
        tmp2 = rnd(0, this.length-1);
    }while(tmp2 === tmp);
    return [
        this[tmp],
        this[tmp2]
    ];
};

let start = function () {

    ranks = ranks.doublePick();

    //1.清空数据库
    Song.remove({}, function (err, result) {
        if(err){
            debug('清库失败!');
            process.exit(0);
        }else{

            for(let i in ranks){
                async.waterfall([
                    //2.读取榜单歌曲信息
                    function (cb) {
                        read(domain, ranks[i], cb);
                    },
                    //3.写入榜单歌曲信息
                    function (songs,cb) {
                        write(songs,cb)
                    },
                    //4.生成歌词lrc
                    function (songs,cb) {
                        lrc(songs, cb);
                    }
                ],function (err,result) {
                    debug(ranks[i].rank + '任务执行完毕');
                });
            }
        }
    });
};
//启动爬虫任务
start();