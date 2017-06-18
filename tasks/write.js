/**
 * Created by sunyanyang on 17/6/18.
 */
let Movie = require('../model').Movie;
let async = require('async');
let debug = require('debug')('crawl:write');
//负责把电影数组保存到mongodb数据库中
module.exports = function (movies, callback) {
    async .forEach(movies, function (movie, cb) {
        Movie.create(movie, cb);
        debug(`写入电影${movie.name}`);
    }, callback);
    //Movie.create(movies, callback);
}