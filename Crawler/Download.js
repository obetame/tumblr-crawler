const request = require('request');
const rq = require("request-promise");
const jsonfile = require('jsonfile');
const chalk = require('chalk');
const download = require('download');
const formatData = require("./formatData");
const fs = require("fs");
const {cookie,headers,limit} = require("../config");
const name = "follow";// store json name

let VideoData = require("./data/video.js");

function getJsonDownload(place=0){
	let allDownloadNumber = 0;
	let startDownload = place;

	DownVideo(VideoData[place].mp4Code).then(()=>{
		console.log("alreay download:",chalk.green(VideoData[place].mp4Code)," in place:",startDownload);
		getJsonDownload(++place);
	}).catch(error=>{
		console.log(chalk.red("error in:"+place," ,Abandon and ready for the next."));
		getJsonDownload(++place);
	});
}

function DownVideo(mp4Code){
	return download("https://vtt.tumblr.com/"+mp4Code+".mp4#_=_").then(data => {
	  fs.writeFile("./Crawler/video/"+mp4Code+'.mp4', data,(error)=>{
	  	Promise.resolve();
	  });
	})
}

getJsonDownload();