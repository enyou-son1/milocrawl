/**
 * Created by sunyanyang on 17/6/18.
 */
var driver = require('node-phantom-simple');
var debug = require('debug')('crawl:read');
var cheerio = require('cheerio');

module.exports = function(domain, rank, callback) {

    driver.create({path: require('phantomjs').path}, function (err, browser) {
        return browser.createPage(function (err, page) {
            return page.open(domain + rank.pathinfo, function (err, status) {

                var error = '';
                var songs = [];
                if (status !== 'success') {
                    error = 'FAIL to load the address';
                    //page.close();
                    callback(error, songs);
                } else {
                    //同步阻塞500毫秒
                    //for(var start = new Date().getTime(); new Date().getTime() - start < 1000;);
                    //evaluate方法返回一个Promise对象
                    return page.evaluate(function () {
                        //获取指定iframe中dom元素的所有子元素,以html形式传给回调函数
                        return document.getElementById('g_iframe').contentWindow.document.getElementById("song-list-pre-cache").innerHTML;
                    }, function (err, result) {
                        //cheerio加载iframe中的dom
                        var $ = cheerio.load(result);
                        $(".j-flag table tbody tr").each(function (index, item) {
                            var id = $(item).find(".f-cb").find(".tt").find("span").attr("data-res-id");
                            var rpic = $(item).find(".f-cb").find(".rpic").attr("src");
                            var remark = $(item).find(".f-cb").find(".ttc").find(".txt").find(".s-fc8").text();
                            var song = {
                                id: id,
                                name: $(item).find(".f-cb").find(".ttc").find(".txt").find("b").text(),
                                url: domain + $(item).find(".f-cb").find(".ttc").find(".txt").find("a").attr("href"),
                                picture: (rpic === undefined ? '' : rpic),
                                remark: (remark === undefined ? '' : remark),
                                duration: $(item).find(".u-dur ").text(),
                                artist: $(item).find(".text").find("span").attr("title"),
                                albumUrl: domain + $(item).find(".text").find("a").attr("href"),
                                rankName: rank.rank,
                                lyricUrl: domain + "/lyric/translrc?id=" + id
                            };
                            debug(`读到歌曲:${song.name}`);
                            songs.push(song);
                        });
                        page.close();
                        browser.exit();
                        callback(error, songs);
                    });
                }
            });
        });
    });
}

/* 基础DEMO:
 * 1. 向网址发出请求得到响应体
 * 2. 把得到的buffer转成字符串
 * 3. 从字符串提取我们需要的内容
 * 4. 把提取到的结果传入回调函数
 */
/*
let request = require('request');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
let debug = require('debug')('crawl:read');
module.exports = function (url, callback) {
    request({url, encoding: null}, function (err, response, body) {
        body = iconv.decode(body, 'gbk');
        let $ = cheerio.load(body);
        let movies = [];
        $('.keyword a.list-title').each(function (index, item) {
            let $this = $(this);
            let movie = {
                name: $this.text(),
                url: $this.attr('href')
            };
            debug(`读到电影:${movie.name}`);
            movies.push(movie);
        });
        callback(err, movies);
    });
};
*/