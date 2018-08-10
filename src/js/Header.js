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

import {getCookie} from './utils';


@CSSModules(header, {allowMultiple: true})
class Header extends React.Component {
  static propTypes = {
    customHomeTitle: PropTypes.string, //自定义的Home标题名称，默认为'',如果为''那么就用提供的FT中文网Logo图片

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
        clickHandler: PropTypes.func,//点击事件处理函数，如果有,那么该项目为div,且代替url
        url: PropTypes.string,//如果没有点击事件处理函数，那么该项目就为a有url
        name: PropTypes.string.isRequired,
        showTime: PropTypes.oneOf(['before','after'])
      })
    ),
    hasSignedIn:PropTypes.bool,
    //signedFlagCookieName: PropTypes.string,
    /*
    accountType: PropTypes.string,
    loginUrl: PropTypes.string,
    findPasswordUrl: PropTypes.string,
    registerUrl: PropTypes.string,
    */

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

  static defaultProps = {
    customHomeTitle:'',
    //signedFlagCookieName: 'USER_NAME',
    hasSignedIn:false,
    defaultSelectedTopChannelOrder: 0,
    defaultSelectedSubChannelOrder: -1,
    dynamicNav: false
  }

  constructor(props) {
    super(props);
    //const {signedFlagCookieName} = this.props;
    this.state = {
      //hasSignedIn: signedFlagCookieName ? !!getCookie(this.props.signedFlagCookieName) : false,
      //selectedTopChannelOrder: 0,
      selectedTopChannelName: "",
      //selectedSubChannelOrder: -1,
      selectedSubChannelName: "",
      isHome: true
    }
    this.callbackForNav = this.callbackForNav.bind(this);
  }

  componentDidMount() {
    this.setState({
     // isHome:this.refs.navPart.props.defaultSelectedTopChannelOrder === 0 && this.refs.navPart.props.defaultSelectedSubChannelOrder === -1 //NOTE：切记this.refs在componentDidMount时才能访问
     isHome: this.props.navDefaultTopOrder === 0 && this.props.navDefaultSubOrder === -1
    })
  }
  callbackForNav(gottenData) {
    // console.log(`Gotten nav data:`);
    // console.log(gottenData);
    const { selectedTopChannelOrder, selectedSubChannelOrder, selectedTopChannelName, selectedSubChannelName } = gottenData;
    this.setState({//待思考：这里调用setState不会引发循环，但是它确实是在外层component的render中调用的，但它是在Nav的componentDidMount()中调用的。。。待研究
      selectedTopChannelName: selectedTopChannelName,
      selectedSubChannelName: selectedSubChannelName,
      isHome: selectedTopChannelOrder ===0 && selectedSubChannelOrder === -1 
    })
  }
  renderTopPart() {
    // console.log('this.state when renderTopPart:');
    // console.log(this.state);
    const { selectedTopChannelName, selectedSubChannelName, isHome } = this.state;
    const { customHomeTitle, pushdownMenuData, signData, hasSignedIn} = this.props;
    //console.log(`isHome:${isHome}`);
    const channelTitle = !isHome ? (selectedSubChannelName !== '' ? selectedSubChannelName : (selectedTopChannelName !== '' ? selectedTopChannelName : '')) : '';
    const homeTitleStyle = classnames({
      "home-default-title": customHomeTitle === '',
      "home-text-title": customHomeTitle !== '',
    });
    const leftBrandStyle = classnames({
      "left-default-brand": customHomeTitle === '',
      "left-text-brand": customHomeTitle !== ''
    });

    return (
      <div styleName="top-part">
        <div styleName="content">
          <div styleName="top-column column-center">
            <div styleName={homeTitleStyle}>
              {customHomeTitle}
            </div>
            { /*在不是Home的情况下显示channelTitle覆盖homeTitleStyle,同时该样式决定了其在mobile的时候不可见 */
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
                pushdownMenuData ? (
                  <div styleName="pushdownmenu-tool">
                    <PushdownMenu>
                      {pushdownMenuData.map(item => (
                        <PushdownItem name={item.name} url={item.url} selected={item.selected} key={item.name} />
                      ))}
                    </PushdownMenu>
                  </div>
                ) : null
              ) : (
                <div styleName={leftBrandStyle}>
                   {customHomeTitle}
                </div>
              )
            }
          </div>

          <div styleName="top-column column-right">
            <div styleName="signmenu-tool">
             { 
              signData && signData.length >0 &&
              <SignMenu 
                signData= {signData}
                hasSignedIn = {hasSignedIn}
                // accountType ={accountType}
                // loginUrl = {loginUrl}
                // findPasswordUrl = {findPasswordUrl}
                // registerUrl = {registerUrl}
              />
             }
            </div>
          </div>
        </div>
      </div>
    )
  }


  renderNavPart() {
    const {navChannelData, navDefaultTopOrder, navDefaultSubOrder, dynamicNav} = this.props;
    return navChannelData ? (
      <div styleName="nav-part">
        <Nav channels={navChannelData} dynamicnav={dynamicNav}  defaultSelectedTopChannelOrder={navDefaultTopOrder} defaultSelectedSubChannelOrder={navDefaultSubOrder} callbackFunc={this.callbackForNav} sticky="top" />
      </div>
    ) : null;
  }

  renderSearchBarPart() {
    const { searchPostUrl, searchPlaceHolder } = this.props;
    return searchPostUrl ?(
      <div styleName="search-bar">
        <div styleName="content">
        <SearchBar postUrl={searchPostUrl} placeholderText = {searchPlaceHolder} sticky={true}/>
        </div>
      </div>
    ) : null;
  }

  render() {
    return (
      <header styleName="container">
        {this.renderTopPart()}
        {this.renderNavPart()}
        {this.renderSearchBarPart()} 
      </header>
    );
  }
}

export default Header;