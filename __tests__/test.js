jest.unmock('../src/js/Header');//指示模块系统不应从require（）返回指定模块的模拟版本（例如，它应始终返回实模块）。


//jest会自动mock模拟依赖包，所以真实的要测试的文件要unmock

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Header from '../src/js/Header.js';
import { pushdownMenuData, signData, channelData} from '../testData/data1.js';

describe('Build a FTCHeader', () => {
  it('render', () => {
    const header = ReactTestUtils.renderIntoDocument(
      <Header 
        customHomeTitle="广告管理系统"

        pushdownMenuData={pushdownMenuData}

        signData={signData}
        signedFlagCookieName='USER_NAME'

        dynamicNav={true}
        navChannelData={channelData}
        navDefaultTopOrder={1}
        navDefaultSubOrder={1}

        searchPostUrl={"/search"}
        searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
      />
    );
    const headerNode = ReactDOM.findDOMNode(header);

    expect(headerNode).toBeInstanceOf(HTMLElement);
    expect(headerNode.querySelector('div').className.includes('top-part')).toBeTruthy;
    expect(headerNode.querySelector('div:nth-child(2)').className.includes('nav-part')).toBeTruthy;
    expect(headerNode.querySelector('div:nth-child(3)').className.includes('search-bar')).toBeTruthy;
  });
});

//TODO: More test