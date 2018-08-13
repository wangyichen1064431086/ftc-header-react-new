# ftc-header-react-new

[![](https://travis-ci.org/wangyichen1064431086/ftc-header-react-new.svg?branch=master)](https://travis-ci.org/wangyichen1064431086/ftc-header-react-new)

The new version for ftc-header-react.

The dependency components of it includes '@ftchinese/ftc-pushdownmenu-react','@ftchinese/ftc-nav-react','@ftchinese/ftc-searchbar-react', '@ftchinese/ftc-login-react'.

## Install

```cmd
cd yourProject
npm install "@ftchinese/ftc-header-react-new" --save 
```

## Usage

Example:

```js
import Header from '@ftchinese/ftc-header-react-new';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Header customHomeTitle="管理系统"

    pushdownMenuData={[
      {
        name: "相关资源",
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
        "word":"登录",
        "name":"signIn",
        "showTime":"before"
      },
      {
        "url":"URL_FOR_SIGNUP",
        "word":"免费注册",
        "name":"signUp",
        "showTime":"before"
      },
      {
        "url":"URL_FOR_SIGNOUT",
        "word":"登出",
        "name":"signOut",
        "showTime":"after"
      }
    ]}

    hasSignedIn={false}


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

    searchPostUrl={"URL_FOR_SEARCH"}
    searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
  />,
  document.getElementById('root')
);
```

## Props of Header

You can briefly know about it by the proptypes:

```js
 static propTypes = {
    customHomeTitle: PropTypes.string, 

    pushdownMenuData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string,
        selected: PropTypes.bool.isRequired,
      })
    ),

    signData:PropTypes.arrayOf( // data For SignMenu
      PropTypes.shape({
        word: PropTypes.string.isRequired,
        clickHandler: PropTypes.func,
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        showTime: PropTypes.oneOf(['before','after'])
      })
    ),
    hasSignedIn:PropTypes.bool,

    dynamicNav: PropTypes.bool,// data for Nav
    navChannelData: PropTypes.arrayOf( 
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
        url: PropTypes.string,
        subs: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                order: PropTypes.number.isRequired,
                url: PropTypes.string
            })
        )
      })
    ),
    navDefaultTopOrder: PropTypes.number,
    navDefaultSubOrder: PropTypes.number,

    searchPostUrl: PropTypes.string,
    searchPlaceHolder: PropTypes.string
  }
```

The following are the details about the props:

### customHomeTitle

TYPE String. Default ''. Optional. Self-defined title for home. If it is '', the home title will use FTC logo image.

### pushdownMenuData
TYPE Array. Optional. Data for tc-pushdownmenu-react. Look at [ftc-pushdownmenu-react](https://github.com/wangyichen1064431086/ftc-pushdownmenu-react) for details.

### signData
TYPE Array. Optional. The data for sign menu. For one item of signData, it has the flowing properties:

#### word
TYPE String. Required. The word showed on the menu item.

#### clickHandler
TYPE Func. Optional. The event handler for clicking. If there is the <code>clickHandler</code>, the item would be a <code>div</code>, and will exect the clickHandler func when clicking it. Otherwise, if there is no <code>clickHandler</code>, the item would be an <code>a</code> and will use the following param <code>url</code>.
#### url
Type String. Optional. Default '#'. The navigating target page when clicking on the menu item. If the word is '登录', it will pop a window instead.

#### name
Type String. Optional. The value of the 'key' for every list item of the menu.

#### showTime
Type String, should be 'before' or 'after'. Optional. Default 'before'. Decide to show the item or not depending on if there is the cookie whose name is defined by the variable **signedFlagCookieName**.

### hasSignedIn 

Type Bool. If the user opening the page has signed in. It may passed from parent component, and may depend on some cookies.

### dynamicNav, navChannelData, navDefaultTopOrder, navDefaultSubOrder
Data for @ftchinse/ftc-nav-react.

<code>dynamicNav</code> for the prop <code>dynamicnav</code> of ftc-nav-react.
<code>navChannelData</code> for the prop <code>channels</code> of ftc-nav-react.
<code>navDefaultTopOrder</code> for the prop <code>defaultSelectedTopChannelOrder</code> of ftc-nav-react.
<code>navDefaultSubOrder</code> for the prop <code>defaultSelectedSubChannelOrder</code> of ftc-nav-react.

Look for [ftc-nav-react](https://github.com/wangyichen1064431086/ftc-nav-react) for details.

### searchPostUrl, searchPlaceHolder
Data for ftc-searchbar-react.
<code>searchPostUrl</code> for the prop <code>postUrl</code> of ftc-searchbar-react.
<code>searchPlaceHolder</code> for the prop <code>placeholderText</code> of ftc-searchbar-react.

Look for [ftc-searchbar-react](https://github.com/wangyichen1064431086/ftc-searchbar-react) for details.