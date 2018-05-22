import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import Login from '@ftchinese/ftc-login-react';

import signmenu from '../scss/signmenu.scss';

class SignMenu extends React.Component { //待分离出去成为一个单独的component
  static proptypes = {
    signData: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string,
        url: PropTypes.string,
        showTime: PropTypes.oneOf(['before','after'])
      })
    ),
    hasSignedIn: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      showLoginOverlay: false
    }
  }
  clickToSignIn(e) {
    e.preventDefault();
    this.setState({
      showLoginOverlay: true
    });
  }
  renderMenuList() {
    const { signData, hasSignedIn } = this.props;
    return signData.map(item => {
      const show = hasSignedIn ? item.showTime === 'after' : item.showTime === 'before';
      return 
        { show &&
          (
            <a href={item.url} 
              onClick = {item.word === '登录' && this.clickToSignIn}
            >
              {item.word}
            </a>
          )
        }
    })
  }
  renderLoginOverlay() {
    return 
      this.state.showLoginOverlay &&
      <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register" />
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