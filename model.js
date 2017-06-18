/**
 * Created by sunyanyang on 17/6/18.
 */
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/201702crawl');
let MovieSchema = new mongoose.Schema({
    name:String,
    url:String
});
exports.Movie = mongoose.model('Movie', MovieSchema);