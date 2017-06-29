/**
 * Created by sunyanyang on 17/6/25.
 */
let cheerio = require('cheerio');
let driver = require('node-phantom-simple');
let debug = require('debug')('crawl:read');

module.exports = (songs, callback) => {

    songs.forEach(song => {
        driver.create({path: require('phantomjs').path}, function (err, browser) {
            return browser.createPage(function (err, page) {
                return page.open(song.lyricUrl, function (err, status) {
                    if (status !== 'success') {
                        page.close();
                        browser.exit();
                        debug(song.name + ": 歌词页打开失败");
                    }else{
                        //同步阻塞300毫秒
                        //for(var start = new Date().getTime(); new Date().getTime() - start < 300;);
                        //evaluate方法返回一个Promise对象
                        page.evaluate(function () {
                            //返回局部加载后的歌词div
                            return document.getElementById('g_iframe').contentWindow.document.getElementById("translate").innerHTML;
                        }, function(err, result){
                            console.log(result);
                            page.close();
                            browser.exit();
                        });
                    }
                });
            });
        });
    });
};