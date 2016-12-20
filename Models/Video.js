const mongoose = require('mongoose');

let Video = mongoose.Schema({
  video_url:{type:String,unique: true},//视频原始地址
  parent_url:String,
  mp4Code:String,//视频代码
  fullUrl:String,//完整视频地址
  like:Number,//喜欢数量,
  tags:Array
});

let Videos = mongoose.model('Videos',Video);
module.exports = Videos;