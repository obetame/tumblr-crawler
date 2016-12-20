const mongoose = require('mongoose');

let Follow = mongoose.Schema({
  url:String
});

let Follows = mongoose.model('Follows',Follow);
module.exports = Follows;