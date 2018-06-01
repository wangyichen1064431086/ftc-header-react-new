function getCookie(name) {
  const cookieStr = document.cookie;
  const nameLen = name.length;
  const nameStartIndex = cookieStr.indexOf(name+'=');
  if (nameStartIndex < 0) {
    return null;
  }
  const valueStartIndex = nameStartIndex + nameLen + 1;
  let valueEndIndex = cookieStr.indexOf(';', valueStartIndex);

  if( !valueStartIndex && name !== cookieStr.substring(0, nameLen)) {
    return null;
  }
  
  if (valueEndIndex === -1) { //说明它就是最后一个cookie，后面没有;
    valueEndIndex = cookieStr.length;
  }
  return decodeURIComponent(cookieStr.substring(valueStartIndex, valueEndIndex));
}

export {getCookie};