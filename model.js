/**
 * Created by sunyanyang on 17/6/18.
 */
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/201702crawl');
let MovieSchema = new mongoose.Schema({
    name:String,
    url:String
});

let SongSchema = new mongoose.Schema({
    name : String,
    url : String,
    picture : String,
    remark : String,
    duration : String,
    artist : String,
    albumUrl : String,
    rankName : String
});

exports.Movie = mongoose.model('Movie', MovieSchema);
exports.Song = mongoose.model('Song', SongSchema);