/**
 * Created by sunyanyang on 17/6/18.
 */
//let Movie = require('../model').Movie;
let Song = require('../model').Song;
let async = require('async');
let debug = require('debug')('crawl:write');

module.exports = (songs, callback) => {
    async.forEach(songs, (song, cb) => {
        Song.create(song, cb);
        debug(`写入${song.rankName}歌曲:${song.name}`);
    });
    callback('', songs);
}

/* 基础DEMO:
//负责把电影数组保存到mongodb数据库中
module.exports = function (movies, callback) {
    async.forEach(movies, function (movie, cb) {
        Movie.create(movie, cb);
        debug(`写入电影${movie.name}`);
    }, callback);
}
*/