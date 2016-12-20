const request = require('request');
const rq = require("request-promise");
const jsonfile = require('jsonfile');
const chalk = require('chalk');
const formatData = require("./formatData");
const {cookie,headers} = require("../config");
const file = "./data/follow.json";//储存json
const followData = require("./data/follow");

// 获取单个页面的数据
let errorNumber = 0;//错误次数
let rootID = 0;//数据的id
// tumblr_[\da-z]{17}
// http://qiao815.tumblr.com/page/2
let UseUrlGetData = (item,page=1,index=0)=>{
	return new Promise((resolve,reject)=>{
		request({
			url:item[index].url+"page/"+page,
			headers:headers,
			gzip:true
		},(error,httpResponse,body)=>{
			if(error){
				errorNumber++;
				if(errorNumber>20){
					// 错误次数大于10就下一个
					errorNumber = 0;
					UseUrlGetData(item,0,++index);
					return;
				}
				UseUrlGetData(item,page,index);//继续这一页
				console.log("index:",index,"page:",page,"errorNumber:",errorNumber);
				return;
			}
			let trimData = JSON.stringify(body).replace(/\s/g,"");//去掉空格
			let AllData = trimData.match(/tumblr_[\da-z]{17}/gi);//页面上所有的视频code
			if(!AllData){
				errorNumber = 0;
				UseUrlGetData(item,0,++index);
				return;
			}

			let StoreArray = [];
			for(let i=0;i<AllData.length;i++){
				jsonfile.writeFileSync("./json/video2.json", {
					id:++rootID,
					mp4Code:AllData[i],
					fullUrl:"https://vtt.tumblr.com/"+AllData[i]+".mp4#_=_",
				}, {spaces: 2,flag: 'a'})
				// StoreArray.push(StoreData(AllData[i],"no","no"))
			}
			
			// Promise.all(StoreArray).then(()=>{
				// console.log("number:",StoreArray.length,"page:",page);
				UseUrlGetData(item,++page,index);
			// }).catch(error=>{
			// 	console.log("number:",StoreArray.length,"page:",page);
			// 	UseUrlGetData(url,++page);
			// })
		})
	})
}

// 获取关注人页面数据
function getPeopleData(){
	getFollowUrl().then((item)=>{
		UseUrlGetData(item,1,53);
		console.log(item.length);
	})
}
// getPeopleData();