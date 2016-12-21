# tumblr-crawler
Just a Crawler 😁 , can be downloaded automatically.

## Configuation

Fill in the `cookie` in the `./config.js` file (with your own).

> Open the [tumblr.com](www.tumblr.com) site press F12 to open the console select Network, click on a link below, in the request header to find your cookie, copy paste to the `./config.js` file.

1. `limit`:Limit crawler crawling data,default is 0(mean no limit).
2. `skip`:Skip the specified number.

For example, I would like to download 2 from the beginning of the 4,I can do this:

```js
limit:2,
skip:4
```

## Use

Install dependency before use:`npm install`

1. step_one:`npm run step_one`.

![step_one](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git1_Fotor.png)

**If you take the first step and succeed, then you don't need to do it again.**

2. step_two:`npm run step_two`.

![step_two](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git2_Fotor.png)

3. step_three:`npm run step_three`.

![step_three](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git3_Fotor.png)

## Chinese

你可以切换到中文版本的README分支,不过更新会延迟:`git checkout chinese`.

## MIT

This library provides only learning and communication.If you feel this library infringes your rights please contact me😜.