import Header from '../../src/js/Header.js';
//import Header from '../../build/index.es.js';
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
    navDefaultTopOrder={0}
    navDefaultSubOrder={-1}

    searchPostUrl={"/search"}
    searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
  />,
  document.getElementById('root')
);