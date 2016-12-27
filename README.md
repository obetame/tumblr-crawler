# tumblr-crawler
Just a Crawler 😁 , can be downloaded automatically.

## 设置

请先在 `./config.js` 填写你在tumblr网站上的cookie.

**如何获取COOKIE?**

> 首先打开[tumblr](www.tumblr.com),登录后随便一个页面上右击选择检查(或者按下F12),在控制台选择`Network`标签,此时随便点击一个网络请求(如果你没有看到网络请求那么你需要刷新一下页面),再找到你的请求头上的cookie,将那段`Cookie:`后面的值复制到config中去.

1. `limit`:限制下载关注人的数量,有时候关注人很多,此时程序需要较长的时间下载,此时可以通过limit限制.(默认0不限制)
2. `skip`:跳过下载的数量.(默认0不跳过)

比如我想从第4个开始下载两个,那么配置文件如下:

```js
limit:2,
skip:4
```

## Use

1. 克隆库`git clone https://github.com/zhouyuexie/tumblr-crawler.git`
2. 安装依赖:`npm install`.

### step_one

```shell
npm run step_one
```

![step_one](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git1_Fotor.png)

**注意:这一步是获取你所有的关注人信息,所以一般只需要获取一次,也就是说这个命令你只执行一次就可以了.**

### step_two

```shell
npm run step_two
```

![step_two](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git2_Fotor.png)

**这一步是获取所有关注人的视频代码,时间会比较长,可以使用配置文件中的limit,skip来控制.**

### step_three

```shell
npm run step_three
```

![step_three](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git3_Fotor.png)

**tumblr中的视频有些会失效,失效的原因一般都是博主自己删掉或者被举报,不过不用担心,爬虫会尝试获取并且跳过失败的视频.**

## MIT

This library provides only learning and communication.If you feel this library infringes your rights please contact me😜.