const request = require('request');
const rq = require("request-promise");
const jsonfile = require('jsonfile');
const chalk = require('chalk');
const download = require('download');
const fs = require("fs");
const {cookie,headers,limit} = require("../config");

let page = 1;

function getData(page=1){
	return rq({
		uri:"https://www.tumblr.com/likes/page/"+page+"/1484028696?json=1",
		headers:headers,
		json:true,
		gzip:true
	})
	.then(res=>{
		console.log("1")
		return res.posts;
	})
	.catch(error=>{
		console.log(error)
	})
}

getData(1).then(res=>{
	console.log(res)
})