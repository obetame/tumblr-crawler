const request = require('request');
const rq = require("request-promise");
const jsonfile = require('jsonfile');
const chalk = require('chalk');
const formatData = require("./formatData");
const {cookie,headers} = require("../config");
const file = "./data/follow.json";//储存json

// 获取关注人的页面数据
// http:\/\/[\w]*\.tumblr\.com\/
// https://www.tumblr.com/following
/** all 是固定字段,每一页自动加25 */
function getFollowData(page=0,all=25){
	request({
		url:"https://www.tumblr.com/following/"+page*all,
		headers:headers,
		gzip:true
	},(error,httpResponse,body)=>{
		if(error){
			console.log(chalk.red("request error,i will continue try."));
			getFollowData();//继续这一页
			return;
		}
		let trimData = JSON.stringify(body).replace(/\s/g,"");//去掉空格
		let AllData = trimData.match(/http:\/\/[\w]*\.tumblr\.com\//gi);//页面上所有的视频code
		let moreDate = trimData.match(/controlsbottom/gi);//查看是否还有下一页

		// console.log(AllData);
		let StoreArray = [];
		for(let i=0;i<AllData.length;i++){
			StoreArray.push(StoreFollows(AllData[i]))
		}
		
		Promise.all(StoreArray).then((message)=>{
			console.log(chalk.green("store follwer people number:"+(StoreArray.length)));
			if(moreDate){
				getFollowData(++page);
			}
			else{
				// 已经获取完所有的数据
				console.log(chalk.red("no more data."));
				formatData(file);
			}
		})
	})
}

// 存储关注的人
let StoreFollows = (url) =>{
	return new Promise((resolve,reject)=>{
		jsonfile.writeFile(file, {
			url:url
		}, {spaces: 2,flag: 'a'}, function(err) {
			if(err){
				resolve(`store data error:${err}`);
			}
		  else{
		  	resolve();
		  }
		})
	})
}

getFollowData();