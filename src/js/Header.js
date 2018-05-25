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
    customHomeTitle: PropTypes.string, //自定义的Home标题名称，默认为'',如果为''那么就用提供的FT中文网Logo图片
    signData:PropTypes.arrayOf( // data For SignMenu
      PropTypes.shape({
        word: PropTypes.string,
        url: PropTypes.string,
        name: PropTypes.string,
        showTime: PropTypes.oneOf(['before','after'])
      })
    ),
    channelData: PropTypes.arrayOf( // data for Nav
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
    )
  }

  static defaultProps = {
    customHomeTitle:''
  }

  constructor(props) {
    super(props);
    this.state = {
      hasSignedIn: false,
      selectedTopChannelName: "",
      selectedSubChannelName: "",
      isHome:true 
    }
    this.callbackForNav = this.callbackForNav.bind(this);
  }
  callbackForNav(gottenData) {
    console.log(`Gotten nav data:`);
    console.log(gottenData);
    if(gottenData.selectedTopChannelOrder !==0 && gottenData.selectedTopChannelName) {
      this.setState({ //待思考：这里调用setState不会引发循环，但是它确实是在外层component的render中调用的，虽然是在Nav的componentDidMount()中调用的。。。待研究
        selectedTopChannelName:gottenData.selectedTopChannelName,
        isHome: false
      })
    }
    if(gottenData.selectedSubChannelOrder !== -1 && gottenData.selectedSubChannelName) {
      this.setState({
        selectedSubChannelName:gottenData.selectedSubChannelName,
        isHome: false
      })
    }
  }
  renderTopPart() {
    const { selectedTopChannelName, selectedSubChannelName, isHome } = this.state;
    const { customHomeTitle } = this.props;
    // const topColumnCenterStyle = classnames({
    //   "top-column": true,
    //   "column-center": true,
    //   "home-default-title": isHome && customHomeTitle === '',
    //   "home-text-title": isHome && customHomeTitle !== '',
    //   "channel-title": textForTitle !== ''
    // });
    const channelTitle = !isHome ? (selectedSubChannelName !== '' ? selectedSubChannelName : (selectedTopChannelName !== '' ? selectedTopChannelName : '')) : '';
    const homeTitleStyle = classnames({
      "home-default-title": customHomeTitle === '',
      "home-text-title": customHomeTitle !== '',
    });

    return (
      <div styleName="top-part">
        <div styleName="content">
          <div styleName="top-column column-center">
            <div styleName={homeTitleStyle}>
              {customHomeTitle}
            </div>
            { /*在不是Home的情况下显示channelTitle覆盖homeTitleStyle,但是该样式决定了其在mobile的时候不可见 */
              !isHome && (
                <div styleName="channel-title">
                  {channelTitle}
                </div>
              )
            }
            
          </div>

          <div styleName="top-column column-left">
            { 
              isHome ? (
                <div styleName="pushdownmenu-tool">
                  <PushdownMenu>
                    <PushdownItem name={"简体中文"} url={"#"} selected={true} />
                    <PushdownItem name={"繁体中文"} url={"http://big5.ftchinese.com/"} />
                    <PushdownItem name={"英文"} url={"https://www.ft.com/"} />
                  </PushdownMenu>
                </div>
              ) : (
                <div styleName="left-brand"> {/* TODO:这里需要考虑为custom home title时这里要以文字的形式展现 */}
                </div>
              )
            }
          </div>

          <div styleName="top-column column-right">
            <div styleName="signmenu-tool">
              <SignMenu 
                signData= {signData}
                hasSignedIn = {this.state.hasSignedIn}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }


  renderNavPart() {

    return (
      <div styleName="nav-part">
        <Nav channels={channelData} dynamicnav={false} defaultSelectedTopChannelOrder={1} defaultSelectedSubChannelOrder={-1} callbackFunc={this.callbackForNav}/>
      </div>
    )
  }

  renderSearchBarPart() {
    return (
      <div styleName="search-bar">
        <div styleName="content">
        <SearchBar postUrl="\search" placeholderText = "输入年月日‘xxxx-xx-xx’可搜索该日存档" />
        </div>
      </div>
    )
  }
  renderNavigationForMobile() {

  }
  render() {
    return (
      <header styleName="container">
        {this.renderTopPart()}
        {this.renderNavPart()}
        {this.renderSearchBarPart()} 
        {this.renderNavigationForMobile()}     
      </header>
    );
  }
}



export default Header;