import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import header from '../scss/header.scss';//如果省略.scss，虽然在webpack构建本地测试环境时该文件找得到，但是在rollup构建生产环境时该文件找不到。

import {PushdownMenu, PushdownItem} from '@ftchinese/ftc-pushdownmenu-react';
import SignMenu from './SignMenu.js';
import Nav from '@ftchinese/ftc-nav-react';
import SearchBar from '@ftchinese/ftc-searchbar-react';


import { signData, channelData} from './data.js';

@CSSModules(header, {allowMultiple: true})
class Header extends React.Component {
  static propTypes = {
  
  }

  static defaultProps = {
   
  }

  constructor(props) {
    super(props);
    this.state = {
      hasSignedIn: false
    }
  }

  renderTopPart() {
    const {titleText} = this.state;
    return (
      <div styleName="top-part">

        <div styleName="top-column column-center">
          {titleText}
        </div>

        <div styleName="top-column column-left">
          <PushdownMenu>
            <PushdownItem name={"简体中文"} url={"#"} selected={true} />
            <PushdownItem name={"繁体中文"} url={"http://big5.ftchinese.com/"} />
            <PushdownItem name={"英文"} url={"https://www.ft.com/"} />
          </PushdownMenu>
        </div>

        <div styleName="top-column column-right">
          <SignMenu 
            signData= {signData}
            hasSignedIn = {this.state.hasSignedIn}
          />
        </div>

      </div>
    )
  }

  renderNav() {
    return <Nav channels={channelData} dynamicnav={true} />
  }

  renderSearchBar() {
    return <SearchBar postUrl="\search" placeholderText = "输入年月日‘xxxx-xx-xx’可搜索该日存档" />
  }
  render() {
    return (
      <header styleName="header">
        {this.renderTopPart()}
        {this.renderNav()}
        {this.renderSearchBar()}      
      </header>
    );
  }
}



export default Header;