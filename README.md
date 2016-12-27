# tumblr-crawler
Just a Crawler 😁 , can be downloaded automatically.

## Chinese

你可以切换到中文版本的README分支,不过更新可能会延迟:`git checkout chinese`.

或者点击这里查看[中文文档](https://github.com/zhouyuexie/tumblr-crawler/blob/chinese/README.md)

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

1. clone it:`git clone https://github.com/zhouyuexie/tumblr-crawler.git`
2. Install dependency:`npm install`


### step_one

```shell
npm run step_one
```

![step_one](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git1_Fotor.png)

**If you take the first step and succeed, then you don't need to do it again.**

### step_two

```shell
npm run step_two
```

![step_two](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git2_Fotor.png)

### step_three

```shell
npm run step_three
```

![step_three](https://github.com/zhouyuexie/tumblr-crawler/blob/master/picture/git3_Fotor.png)

**Some video has failed, the program will prompt skip and continue the next.**

## MIT

This library provides only learning and communication.If you feel this library infringes your rights please contact me😜.