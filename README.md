# ftc-header-react-new

[![](https://travis-ci.org/wangyichen1064431086/ftc-header-react-new.svg?branch=master)](https://travis-ci.org/wangyichen1064431086/ftc-header-react-new)

The new version for ftc-header-react.

## Install

```cmd
cd yourProject
npm install react react-dom prop-types --save
npm install "@ftchinese/fftc-header-react-new" --save 
```

## Usage

Example:

```js
import SearchBar from '@ftchinese/ftc-searchbar-react';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Header customHomeTitle="管理系统"

    pushdownMenuData={[
      {
        name: "相关资源",
        url: "http://www.ftchinese.com",
        selected: true
      },
      {
        name: "FTC首页",
        url: "http://www.ftchinese.com",
        selected: false
      },
      {
        name: "FT首页",
        url: "https://www.ft.com/",
        selected: false
      },
    ]}

    signData={[
      {
        "url":"http://user.ftchinese.com/login",
        "word":"登录",
        "name":"signIn",
        "showTime":"before"
      },
      {
        "url":"http://user.ftchinese.com/register",
        "word":"免费注册",
        "name":"signUp",
        "showTime":"before"
      },
      {
        "url":"/users/mystories",
        "word":"我的FT",
        "name":"myFT",
        "showTime":"after"
      },
      {
        "url":"/users/cp",
        "word":"设置",
        "name":"setting",
        "showTime":"after"
      },
      {
        "url":"http://user.ftchinese.com/logout",
        "word":"登出",
        "name":"signOut",
        "showTime":"after"
      }
    ]}
    
    signedFlagCookieName='usernameflag'

    dynamicNav={false}
    navChannelData={[
      {
        "name": "首页",
        "url": "http://www.ftchinese.com",
        "order":0,
        "subs":[
          {
            "name":"特别报道",
            "url":"http://www.ftchinese.com/channel/special.html",
            "order":0
          },
          {
            "name":"热门文章",
            "url":"http://www.ftchinese.com/channel/special.html",
            "order":1
          },
          {
            "name":"会议活动",
            "url":"http://www.ftchinese.com/m/events/event.html",
            "order":2
          }
        ]  
      },
      {
        "name": "中国",
        "url": "http://www.ftchinese.com/channel/china.html",
        "order":1,
        "subs":[
          {
            "name":"政经",
            "url":"http://www.ftchinese.com/channel/chinareport.html",
            "order":0
          },
          {
            "name":"商业",
            "url":"http://www.ftchinese.com/channel/chinabusiness.html",
            "order":1
          },
          {
            "name":"金融市场",
            "url":"http://www.ftchinese.com/channel/chinamarkets.html",
            "order":2
          }
        ]
      },
      {
        "name": "全球",
        "url": "http://www.ftchinese.com/channel/world.html",
        "order":2
      },
    ]}
    navDefaultTopOrder={1}
    navDefaultSubOrder={1}

    searchPostUrl={"/search"}
    searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
  />,
  document.getElementById('root')
);
```