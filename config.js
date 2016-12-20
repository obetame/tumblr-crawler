const cookie = "";//Please fill in your cookie

module.exports = {
	cookie:cookie,
	headers:{
		"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"accept-encoding":"gzip, deflate, sdch, br",
		"accept-language":"zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4",
		"cache-control":"max-age=0",
		"cookie":cookie,
		"upgrade-insecure-requests":1,
		"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
	},
	limit:0,//Limit crawler crawling data,default is 0(no limit)
}