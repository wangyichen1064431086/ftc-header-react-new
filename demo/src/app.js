import Header from '../../src/js/Header.js';
//import Header from '../../build/index.es.js';
import Login from '@ftchinese/ftc-login-react';

import React from 'react';
import ReactDOM from 'react-dom';

import { pushdownMenuData, channelData} from './data.js';
import {getCookie} from './utils';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSignedIn: !!getCookie('userid'),
      showLoginOverlay: false
    }

    this.clickToShowLoginOverlay = this.clickToShowLoginOverlay.bind(this);
    this.clickToCloseLoginOverlay = this.clickToCloseLoginOverlay.bind(this);
  }

  clickToShowLoginOverlay() {
    console.log('click');
    this.setState({
      showLoginOverlay:true
    })
  }
  clickToCloseLoginOverlay(e) {
    if(e.target.className.includes('bgshadow') || e.target.className.includes('overlay-close')) {
      this.setState({
        showLoginOverlay: false
      });
    }
  }
  render() {
    return (
      <div>
        <Header 
          customHomeTitle="广告管理系统"

          pushdownMenuData={pushdownMenuData}

          hasSignedIn = {this.state.hasSignedIn}
          signData={[
            {
              word:"登录",
              name:"signIn",
              clickHandler: this.clickToShowLoginOverlay,
              showTime:"before"
            },
            {
              "url":"/logout",
              "word":"登出",
              "name":"signOut",
              "showTime":"after"
            }
          ]}
          //signedFlagCookieName='USER_NAME'
          // accountType = 'username'
          // loginUrl = 'user/login'

          dynamicNav={false}
          navChannelData={channelData}
          navDefaultTopOrder={0}
          navDefaultSubOrder={-1}

          searchPostUrl={"/search"}
          searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
        />
        <Login postUrl={'/user/login'} accountType={'username'} findPasswordUrl={'/user/findpassword'} registerUrl={'/user/register'}
          closeFunc={this.clickToCloseLoginOverlay} 
          show={this.state.showLoginOverlay}
        />
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);