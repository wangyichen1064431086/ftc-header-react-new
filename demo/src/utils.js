function getCookie(name) {
  const cookieStr = document.cookie;
  const nameLen = name.length;
  const nameStartIndex = cookieStr.indexOf(name+'=');
  if (nameStartIndex < 0) {
    return null;
  }
  const valueStartIndex = nameStartIndex + nameLen + 1;
  let valueEndIndex = cookieStr.indexOf(';', valueStartIndex);

  if( !valueStartIndex && name !== cookieStr.substring(0, nameLen)) {////当startIndex为0的时候说明该name是第一个cookie,那name必须就是cookieStr.substring(0, name.length)
    return null;
  }
  
  if (valueEndIndex === -1) { //说明它就是最后一个cookie，后面没有;
    valueEndIndex = cookieStr.length;
  }
  return decodeURIComponent(cookieStr.substring(valueStartIndex, valueEndIndex));
}

function setCookie(name, value, path, domain, expires, secure) {
  let cookieStr = '';
  if(name && value) {
     cookieStr = `${decodeURIComponent(name)}=${decodeURIComponent(value)};`
  }else {
    return;
  }

  if(path) {
    cookieStr += `path=${path};`;
  }
  if(domain) {
    cookieStr += `domain=${domain};`;
  }
  if(expires && typeof expires === 'string'){
    if((new Date(expires)) instanceof Date) {
      cookieStr += `expires=${new Date(expires).toUTCString()};`
    }
  } else if (expires && expires instanceof Date) {
    cookieStr += `expires=${expires.toUTCString()};`
  }

  if(secure) {
    cookieStr += `secure=${secure};`
  }
  document.cookie =cookieStr;
}

export {getCookie, setCookie};