import Header from '../../src/js/Header.js';
import React from 'react';
import ReactDOM from 'react-dom';

import { pushdownMenuData, signData, channelData} from './data.js';

ReactDOM.render(
  <Header 
    customHomeTitle="广告管理系统"
    
    pushdownMenuData={pushdownMenuData}

    signData={signData}
    signedFlagCookieName='USER_NAME'

    dynamicNav={true}
    navChannelData={channelData}
    navDefaultTopOrder={1}
    navDefaultSubOrder={1}
  />,
  document.getElementById('root')
);