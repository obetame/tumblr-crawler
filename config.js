const cookie = "tmgioct=5848238e2b58090945774300; rxx=1o31lv6aufj.jmrmj2a&v=1; anon_id=RCAUAXKQRWWWIFDUOKECENJBWBCVNUKC; pfp=AHzmqiTvyrlyv2qKXyg9HLVBUMtDC7M1wUtBy3x1; pfs=m1qXGJ0zhk8GDrR8qusN7wQfZw; pfe=1491806293; pfu=211618610; language=%2Czh_CN; logged_in=1; nts=true; devicePixelRatio=1; documentWidth=1008; capture=MhzYFvIUk5qPsq7z4EjIIOV3a3M; _ga=GA1.2.1788906377.1481122722; __utma=189990958.1788906377.1481122722.1481122722.1484030268.2; __utmb=189990958.0.10.1484030268; __utmc=189990958; __utmz=189990958.1481122722.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); yx=ow9q0bgp4t8g4%26o%3D3%26f%3Dde";//Please fill in your cookie

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
	skip:0,// Skip the specified number
}