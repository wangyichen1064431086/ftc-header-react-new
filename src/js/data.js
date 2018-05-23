const signData = [
  {
    "url":"http://user.ftchinese.com/login",
    "word":"登录",
    "showTime":"before"
  },
 {
    "url":"http://user.ftchinese.com/register",
    "word":"免费注册",
    "showTime":"before"
  },
  {
    "url":"/users/mystories",
    "word":"我的FT",
    "showTime":"after"
  },
 {
    "url":"/users/cp",
    "word":"设置",
    "showTime":"after"
  },
  {
    "url":"http://user.ftchinese.com/logout",
    "word":"登出",
    "showTime":"after"
  }
];

const channelData = [
  {
    "name": "首页",
    "order":0,
    "subs":[
      {
        "name":"特别报道",
        "order":0
      },
      {
        "name":"热门文章",
        "order":1
      }
    ]  
  },
  {
    "name": "中国",
    "order":1,
    "subs":[
      {
        "name":"政经",
        "order":0
      },
      {
        "name":"商业",
        "order":1
      }
    ]
  },
  {
    "name": "全球",
    "order":2
  },
  {
    "name": "经济",
    "order":3
  },
  {
    "name": "金融市场",
    "order":4
  },
  {
    "name": "商业",
    "order":5
  },
  {
    "name": "创新经济",
    "order":6
  }
];

export {  signData, channelData };