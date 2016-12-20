const Videos = require("../Models/Video.js");
const Follows = require("../Models/Follow.js");
const mongoose = require('mongoose');//连接mongodb
mongoose.Promise = global.Promise;
const async = require("async");
const opts = {
	server:{
		//防止长期运行的程序出现数据库连接错误
		socketOptions:{keepAlive:1}
	}
};
// mongoose.connect('mongodb://name:password@localhost:27017/tumblr',opts);//连接测试库