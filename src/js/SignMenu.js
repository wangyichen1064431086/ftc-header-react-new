import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

//import Login from '@ftchinese/ftc-login-react';
import signmenu from '../scss/signmenu.scss';

@CSSModules(signmenu, { allowMultiple:true })
class SignMenu extends React.Component { //待分离出去成为一个单独的component
  static proptypes = {
    signData: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string.isRequired,
        clickHandler: PropTypes.func,//点击事件处理函数，如果有就执行，且代替url
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        showTime: PropTypes.oneOf(['before','after'])
      })
    ),
    hasSignedIn: PropTypes.bool
  }


  constructor(props) {
    super(props);
    this.state = {
      showLoginOverlay: false
    };
    //this.clickToSignIn = this.clickToSignIn.bind(this);
    //this.clickToCloseLoginOverlay = this.clickToCloseLoginOverlay.bind(this);
  }
  /*
  clickToSignIn(e) {
    e.preventDefault();
    this.setState({
      showLoginOverlay: true
    });
  }
  clickToCloseLoginOverlay(e) {
    if(e.target.className.includes('bgshadow') || e.target.className.includes('overlay-close')) {
      this.setState({
        showLoginOverlay: false
      });
    }
  }
  */
  renderMenuList() {
    const { signData, hasSignedIn } = this.props;
    if (!signData || signData.length === 0) {
      return null;
    }
    return signData.map((item, index) => {
      if(!item.word) {
        return null;
      }
      const showTime = item.showTime || 'before';
      const handler = item.clickHandler || null;
      console.log('handler:',handler);
      const url = item.url || '#';
      const keyname = item.name || index;
      const show = hasSignedIn ? showTime === 'after' : showTime === 'before';
      const itemStyle = classnames({
        'item--nosigned': !hasSignedIn,
        'item--signed': hasSignedIn
      });
      const listItem = handler ? (
        <li key={keyname} styleName={itemStyle} onClick={handler}>
          {item.word}
        </li>
      ) : (
        <li key={keyname} styleName={itemStyle}>
          <a href = {url}>
            {item.word}
          </a>
        </li>
      )
      console.log('listItem:',listItem);
      /*
      return show ? (
          <a href={url} key={keyname} styleName={itemStyle}
            onClick = {item.word === '登录' ? this.clickToSignIn : null}
          >
            {item.word}
          </a>
        ) : null;
      */
      return show ? listItem : null;
    })
  }

  /*
  renderLoginOverlay() {
    const {showLoginOverlay} = this.state;
    const {loginUrl,accountType, findPasswordUrl, registerUrl} = this.props;

    const rightAccountType = ['email','username','both'].includes(accountType) ? accountType : 'email';
    console.log(showLoginOverlay);
    return (
      <Login postUrl={loginUrl} accountType={rightAccountType} findPasswordUrl={findPasswordUrl} registerUrl={registerUrl}
      closeFunc={this.clickToCloseLoginOverlay} 
      show={showLoginOverlay}
      />
    )
  }
  */
  render() {
    return (
      <ul styleName="menu">
        { this.renderMenuList() }
        {/* this.renderLoginOverlay()*/}
      </ul>
    );
  }

}

export default SignMenu;