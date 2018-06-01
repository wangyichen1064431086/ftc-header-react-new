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
        word: PropTypes.string,
        url: PropTypes.string,
        name: PropTypes.string,
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
  clickToCloseLoginOverlay() {
    this.setState({
      showLoginOverlay: false
    });
  }
  renderMenuList() {
    const { signData, hasSignedIn } = this.props;
    return signData.map(item => {
      const show = hasSignedIn ? item.showTime === 'after' : item.showTime === 'before';
      const itemStyle = classnames({
        'item--nosigned': !hasSignedIn,
        'item--signed': hasSignedIn
      })
      return show ? (
          <a href={item.url} key={item.name} styleName={itemStyle}
            onClick = {item.word === '登录' ? this.clickToSignIn : null}
          >
            {item.word}
          </a>
        ) : null;
        
    })
  }
  renderLoginOverlay() {
    const {showLoginOverlay} = this.state;
    return (
      showLoginOverlay &&
      <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register"
      closeFunc={this.clickToCloseLoginOverlay} 
      forcedShow={showLoginOverlay}
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