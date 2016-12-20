const request = require('request');
const rq = require("request-promise");
const fs = require('fs');
const jsonfile = require('jsonfile');
const download = require('download');
const chalk = require('chalk');
const _ = require("underscore");
const {cookie,headers} = require("../config");

const query = {
	uri:"https://www.tumblr.com",
	headers:headers
};

// https://www.tumblr.com/video_file/t:uwOeO_AmQYW5xb2GYCIG0Q/154149442399/tumblr_o48e7ar3bR1v1dg5l
// https://vtt.tumblr.com/tumblr_o48e7ar3bR1v1dg5l.mp4#_=_
// https://www.tumblr.com/dashboard/1/154161477579?json=1

let pageRoot  = 1;//第一页
let downloadNumber =0;//下载量
let downlerrorArray = [];//下载出错量,用数组代替

function getData(page){
	// 从服务器获取数据
	request({url:query.uri+page,headers:query.headers,gzip:true},(error,httpResponse,body)=>{
		if(error){
			// console.log("error:",error);
			console.log("请求发生错误,准备重试...")
			setTimeout(()=>{
				getData(page);
			},1000);
		}
		else{
			let trimData = JSON.parse(JSON.stringify(body).replace(/[\s\(\)]/g,""));
			let AllData = JSON.parse(trimData);//数据要转两次...
			let jsonposts = AllData.posts;

			let videoArray = [];
			
			console.log("start download page->",pageRoot);

			for(let i=0;i<jsonposts.length;i++){
				// 如果不是视频类型就跳过不下载
				if(jsonposts[i].type.slice(0,5)!=="video" || !jsonposts[i].video_url){
					continue;
				}
				//或者不是本站的视频就跳过不下载
				let code =jsonposts[i].video_url.match(/tumblr_(\w*)/g);//视频独特的id
				// try{
				// 	code = jsonposts[i].video_url.match(/tumblr_(\w*)/g);//视频独特的id
				// }
				// catch(e){
				// 	console.log(jsonposts[i].video_url);
				// 	console.log("这个url有问题");
				// 	getData(AllData.next_page);//继续下一页
				// 	return;
				// }
				
				if(!code){
					continue;
				}
				
				videoArray.push(
					new Videos({
						video_url:jsonposts[i].video_url,
						parent_url:jsonposts[i].parent_url,
						mp4Code:code[0],
						fullUrl:"https://vtt.tumblr.com/"+code[0]+".mp4#_=_",
						like:parseInt(jsonposts[i].note_count,10),
						tags:jsonposts[i].tags
					}).save(()=>{
						Promise.resolve();
					}).catch(error=>{
						downlerrorArray.push(1);
						// console.log("store error number:",downlerrorArray.length);
						// console.log(error.errmsg)
					})
					// new Promise((resolve,reject)=>{
					// 	return DownVideo(code[0],jsonposts[i].video_url,jsonposts[i].parent_url).then(res=>{
					// 		console.log("Download completed:",code[0]);
					// 		resolve(i);
					// 	}).catch(error=>{
					// 		console.log("Download error")
					// 	})
					// })
				)
			}

			if(videoArray.length===0){
				// 这个页面没有视频数据
				pageRoot++;
				getData(AllData.next_page);//继续下一页
			}
			else{
				Promise.all(videoArray).then(()=>{
					downloadNumber = videoArray.length+downloadNumber;
					pageRoot++;
					console.log("page:",pageRoot,"-----","already download:",downloadNumber);
					getData(AllData.next_page);//继续下一页
				})
			}
		}
	})
}

// 检测是否下载过
function AlreadyDownload(mp4Code,video_url,parent_url){
	return new Promise((resolve,reject)=>{
		return Videos.findOne({mp4Code:mp4Code},(error,result)=>{
			if(result){
				// 找到
				resolve(true);
			}
			else{
				new Videos({video_url:video_url,parent_url:parent_url,mp4Code:mp4Code}).save(()=>{
					// 没有找到
					resolve(false);
				})
			}
		})
	})
}

// 下载视频
function DownVideo(mp4Code){
	return download("https://vtt.tumblr.com/"+mp4Code+".mp4#_=_").then(data => {
	  fs.writeFile("/Users/Macx/video/"+mp4Code+'.mp4', data,(error)=>{
	  	Promise.resolve();
	  });
	})
	// .catch(error=>{
	// 	// Promise.resolve();
	// 	Promise.reject("download error");
	// });
}

// 存储关注的人
let StoreFollows = (url) =>{
	return new Promise((resolve,reject)=>{
		new Follows({
			url:url
		}).save((error,item)=>{
			if(!error){
				resolve(item);
			}
		});
	})
}

// 获取关注人的页面数据
// http:\/\/[\w]*\.tumblr\.com\/
// https://www.tumblr.com/following
function getFollowData(page=0){
	request({
		url:"https://www.tumblr.com/following/"+page,
		headers:query.headers,
		gzip:true
	},(error,httpResponse,body)=>{
		if(error){
			getFollowData(page);//继续下一页
			return;
		}
		let trimData = JSON.stringify(body).replace(/\s/g,"");//去掉空格
		let AllData = trimData.match(/http:\/\/[\w]*\.tumblr\.com\//gi);//页面上所有的视频code
		if(!AllData){
			getFollowData(page);//继续下一页
			return;
		}

		console.log(AllData);
		let StoreArray = [];
		for(let i=0;i<AllData.length;i++){
			StoreArray.push(StoreFollows(AllData[i]))
		}
		
		Promise.all(StoreArray).then(()=>{
			console.log("number:",StoreArray.length)
		})
	})
}
// getFollowData(100)

// 从数据库获取关注人的url
let getFollowUrl = ()=>{
	return new Promise((resolve,reject)=>{
		Follows.find().exec((error,item)=>{
			if(!error){
				resolve(item);
			}
		});
	})
}

// 存储数据库
function StoreData(mp4Code,video_url,parent_url){
	return new Promise((resolve,reject)=>{
		new Videos({
			video_url:video_url,
			parent_url:parent_url,
			mp4Code:mp4Code,
			fullUrl:"https://vtt.tumblr.com/"+mp4Code+".mp4#_=_",
			like:0,
			tags:[]
		}).save((item)=>{
			resolve();
		});
	})
}

// 获取单个页面的数据
let errorNumber = 0;//错误次数
let rootID = 0;//数据的id
// tumblr_[\da-z]{17}
// http://qiao815.tumblr.com/page/2
let UseUrlGetData = (item,page=1,index=0)=>{
	return new Promise((resolve,reject)=>{
		request({
			url:item[index].url+"page/"+page,
			headers:query.headers,
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

// 格式化获取的json数据,并且去掉重复的
function formatJsonData(){
	let Data = require("./json/video.js");
	// 去重
	let uniqData = _.uniq(Data,true,(item)=>{
		return item.mp4Code;
	})
	console.log(uniqData.length);//长度

	for(let i=0;i<uniqData.length;i++){
		jsonfile.writeFileSync("./json/video.json", uniqData[i], {spaces: 2,flag: 'a'})
	}
}

// 通过本地json文件下载视频
let VideoData = require("./json/video.js");
function getJsonDownload(place=0){
	let allDownloadNumber = 0;//总下载量
	let startDownload = place;//开始下载地方,每次需要改
	// 一次性下载十个
	
	// let downloadArray = [];
	// for(let i=startDownload;i<startDownload+10;i++){
	// 	let code = VideoData[i].mp4Code;
	// 	downloadArray.push(DownVideo(code));

	// 	console.log("ready download:",code);
	// }
	
	// Promise.all(downloadArray).then(()=>{
	// 	allDownloadNumber = allDownloadNumber+10;
	// 	console.log("All Download:",allDownloadNumber,"place:",startDownload);
	// 	getJsonDownload(allDownloadNumber);
	// })
	// .catch(error=>{
	// 	// 重新开始
	// 	console.log("error")
	// 	getJsonDownload(place+10);
	// })
	if(place>4000){
		console.log("in here:",place);
		return;
	}
	DownVideo(VideoData[place].mp4Code).then(()=>{
		console.log("alreay download:",chalk.green(VideoData[place].mp4Code),"place:",startDownload);
		getJsonDownload(++place);
	}).catch(error=>{
		console.log(chalk.red("error:"+place));
		getJsonDownload(++place);
	});
}
// 100-500//
// 1070-1200//
// 1397-1500//
// 557-700//
// 715-1000//
// 1563-2000//
// 2012-2500//
// 2501-3000//
// 3000-3500//
// 3501-4000//
getJsonDownload(3501);//6701
//下载图片
// function DownImage(url){
// 	return download(url).then(data => {
// 	  fs.writeFileSync(url+'.mp4', data);
// 	});
// }

// DownVideo();
// https://www.tumblr.com/dashboard/2/154224982520?json=1
// https://www.tumblr.com/search/%E8%90%9D%E8%8E%89?filter_nsfw=false&sort=top&filter_post_type=video
// https://www.tumblr.com/search/%E8%90%9D%E8%8E%89/post_page/2?sort=top&filter_post_type=video&before=20&json=1
// getData("/search/%E8%87%AA%E6%85%B0/post_page/1?sort=top&filter_post_type=video&before=20&json=1");