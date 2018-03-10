var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HashtagSchema = new Schema({
tag: String

});
module.exports = mongoose.model("Hashtag", HashtagSchema);;
