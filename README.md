# tumblr-crawler
Just a Crawler 😁 , can be downloaded automatically.

## 设置

请先在 `./config.js` 填写你在tumblr网站上的cookie.

1. `limit`:限制下载关注人的数量,有时候关注人很多,此时程序需要较长的时间下载,此时可以通过limit限制.(默认0不限制)
2. `skip`:跳过下载的数量.(默认0不跳过)

比如我想从第4个开始下载两个,那么配置文件如下:

```js
limit:2,
skip:4
```

## Use

使用前请先按照依赖:`npm install`

1. step_one:`npm run step_one`.

![step_one](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git1_Fotor.png)

2. step_two:`npm run step_two`.

![step_two](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git2_Fotor.png)

3. step_three:`npm run step_three`.

![step_three](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git3_Fotor.png)

## MIT

This library provides only learning and communication.If you feel this library infringes your rights please contact me😜.