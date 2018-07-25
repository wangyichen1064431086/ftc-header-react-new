import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import Login from '@ftchinese/ftc-login-react';
import signmenu from '../scss/signmenu.scss';

@CSSModules(signmenu, { allowMultiple:true })
class SignMenu extends React.Component { //待分离出去成为一个单独的component
  static proptypes = {
    signData: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string.isRequired,
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
    this.clickToSignIn = this.clickToSignIn.bind(this);
    this.clickToCloseLoginOverlay = this.clickToCloseLoginOverlay.bind(this);
  }

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
      const url = item.url || '#';
      const keyname = item.name || index;
      const show = hasSignedIn ? showTime === 'after' : showTime === 'before';
      const itemStyle = classnames({
        'item--nosigned': !hasSignedIn,
        'item--signed': hasSignedIn
      })
      return show ? (
          <a href={url} key={keyname} styleName={itemStyle}
            onClick = {item.word === '登录' ? this.clickToSignIn : null}
          >
            {item.word}
          </a>
        ) : null;
        
    })
  }
  renderLoginOverlay() {
    const {showLoginOverlay} = this.state;
    console.log(showLoginOverlay);
    return (
      <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register"
      closeFunc={this.clickToCloseLoginOverlay} 
      show={showLoginOverlay}
      />
    )
  }
  render() {
    return (
      <div styleName="menu">
        { this.renderMenuList() }
        { this.renderLoginOverlay() }
      </div>
    );
  }

}

export default SignMenu;