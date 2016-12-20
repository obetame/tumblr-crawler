const request = require('request');
const rq = require("request-promise");
const jsonfile = require('jsonfile');
const chalk = require('chalk');
const formatData = require("./formatData");
const {cookie,headers} = require("../config");
const file = "./Crawler/data/follow.json";//储存json

if(cookie===""){
	console.log(chalk.red("require a cookie!!"));
	return;
}

// Get people's attention page data
// http:\/\/[\w]*\.tumblr\.com\/
// https://www.tumblr.com/following
/** all Is a fixed field, each page automatically add 25 */
function getFollowData(page=0,all=25){
	request({
		url:"https://www.tumblr.com/following/"+page*all,
		headers:headers,
		gzip:true
	},(error,httpResponse,body)=>{
		if(error){
			console.log(chalk.red("request error,i will continue try."));
			getFollowData();//Continue on this page
			return;
		}
		let trimData = JSON.stringify(body).replace(/\s/g,"");//Remove spaces
		let AllData = trimData.match(/http:\/\/[\w]*\.tumblr\.com\//gi);//All video on page code
		let moreDate = trimData.match(/controlsbottom/gi);//See if there is another page

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
				// All data has been acquired
				console.log(chalk.red("no more data."));
				formatData(file,"follow").then(()=>{
					console.log(chalk.blue("you can start get video code."));
				});
			}
		})
	})
}

// Storage concern
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