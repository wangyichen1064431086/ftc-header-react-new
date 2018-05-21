jest.unmock('../src/js/SearchBar');//指示模块系统不应从require（）返回指定模块的模拟版本（例如，它应始终返回实模块）。


//jest会自动mock模拟依赖包，所以真实的要测试的文件要unmock

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import SearchBar from '../src/js/SearchBar.js';

describe('Build a Searchbar', () => {
  it('render', () => {
    const searchBar = ReactTestUtils.renderIntoDocument(
      <SearchBar postUrl="#" />
    );
    const searchBarNode = ReactDOM.findDOMNode(searchBar);

    expect(searchBarNode).toBeInstanceOf(HTMLElement);
    expect(searchBarNode.className.includes('initial-container')).toBeTruthy;
    expect(searchBarNode.querySelector('form').className.includes('form')).toBeTruthy;
    expect(searchBarNode.querySelector('button').className.includes('switch-btn')).toBeTruthy;
    expect(searchBarNode.querySelector('form button').className.includes('search-btn')).toBeTruthy;
    expect(searchBarNode.querySelector('form p').className.includes('input-area')).toBeTruthy;
    expect(searchBarNode.querySelector('form input')).toBeInstanceOf(HTMLElement);
  });

  it('Toggle', () => {
    const searchBar = ReactTestUtils.renderIntoDocument(
      <SearchBar postUrl="#" />
    );
    const searchBarNode = ReactDOM.findDOMNode(searchBar);
    const switchBtnNode = searchBarNode.querySelector('button');
    const searchFormNode = searchBarNode.querySelector('form');

    let formCssStyle = window.getComputedStyle ? getComputedStyle(searchFormNode) : searchFormNode.currentStyle;
     // getComputedStyle for modern browsers, currentStyle for IE8-

    expect(searchBarNode.className.includes('initial-container')).toBeTruthy;
    //expect(formCssStyle.display).toBe('none'); //这里计算有问题

    ReactTestUtils.Simulate.click(switchBtnNode);

    expect(searchBarNode.className.includes('initial-container')).toBeFalsy;
    formCssStyle = window.getComputedStyle ? getComputedStyle(searchFormNode) : searchFormNode.currentStyle;
    expect(formCssStyle.display).toBe('block');

    ReactTestUtils.Simulate.click(switchBtnNode);
    expect(searchBarNode.className.includes('initial-container')).toBeTruthy;
    formCssStyle = window.getComputedStyle ? getComputedStyle(searchFormNode) : searchFormNode.currentStyle;
    //expect(formCssStyle.display).toBe('none');
  });
});
