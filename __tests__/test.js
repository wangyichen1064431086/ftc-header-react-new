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
    expect(headerNode.querySelector('.top-part')).toBeTruthy;
    expect(headerNode.querySelector('.nav-part')).toBeTruthy;
    expect(headerNode.querySelector('.search-bar')).toBeTruthy;
  });
});

describe('Test for showing home or channel', () => {
  it('show home', () => {
    const header = ReactTestUtils.renderIntoDocument(
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
      />
    );
    const headerNode = ReactDOM.findDOMNode(header);
    const topPartNode = headerNode.querySelector('.top-part');
    expect(topPartNode.querySelector('.home-text-title').textContent).toBe('广告管理系统');
    expect(topPartNode.querySelector('.channel-title')).toBeNull;

    expect(topPartNode.querySelector('.pushdownmenu-tool')).toBeInstanceOf(HTMLElement);
    expect(topPartNode.querySelector('.left-text-brand')).toBeNull;

    const navPartNode = headerNode.querySelector('.nav-part');
    expect(navPartNode.querySelector('[class*="item-top--selected"]').firstChild.nodeValue).toBe('首页');
    expect(navPartNode.querySelector('[class*="item-sub--selected"]')).toBeNull;
  });

  it('show top channel ', () => {
    const header = ReactTestUtils.renderIntoDocument(
      <Header 
        customHomeTitle="广告管理系统"

        pushdownMenuData={pushdownMenuData}

        signData={signData}
        signedFlagCookieName='USER_NAME'

        dynamicNav={true}
        navChannelData={channelData}
        navDefaultTopOrder={1}
        navDefaultSubOrder={-1}

        searchPostUrl={"/search"}
        searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
      />
    );
    const headerNode = ReactDOM.findDOMNode(header);
    const topPartNode = headerNode.querySelector('.top-part');
    expect(topPartNode.querySelector('.channel-title').textContent).toBe('中国');

    expect(topPartNode.querySelector('.pushdownmenu-tool')).toBeNull;
    expect(topPartNode.querySelector('.left-text-brand').textContent).toBe('广告管理系统');

    const navPartNode = headerNode.querySelector('.nav-part');
    expect(navPartNode.querySelector('[class*="item-top--selected"]').firstChild.nodeValue).toBe('中国');
    expect(navPartNode.querySelector('[class*="item-sub--selected"]')).toBeNull;
  });

  it('show sub channel ', () => {
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
    const topPartNode = headerNode.querySelector('.top-part');
    expect(topPartNode.querySelector('.channel-title').textContent).toBe('商业');

    expect(topPartNode.querySelector('.pushdownmenu-tool')).toBeNull;
    expect(topPartNode.querySelector('.left-text-brand').textContent).toBe('广告管理系统');

    const navPartNode = headerNode.querySelector('.nav-part');
    expect(navPartNode.querySelector('[class*="item-top--selected"]').firstChild.nodeValue).toBe('中国');
    expect(navPartNode.querySelector('[class*="item-sub--selected"]').textContent).toBe('商业');
  });
});
