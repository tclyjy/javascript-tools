import crypto from './crypto';

class Cookie {
  getCookies (key) {
    var val = '';
    // 查找cookie中的内容
    document.cookie.split(';').forEach(function (str) {
      str = str.trim();
      if (str.indexOf(key + "=") === 0) { return (val = str.substring(key.length + 1, str.length), false); }
    });
    if (!val) { return null; }
    // 检查内容是否经过加密
    if (val.indexOf('en:/str:') === 0) {
      val = crypto.de(val.slice(8), key);
      return val;
    } else {
      return val;
    }
  }

  setCookies (key, val, expires) {
    if (expires) {
      var date = new Date();
      date.setTime(date.getTime() + (expires * 1e3));
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    if (typeof val !== 'string') { val = JSON.stringify(val); }
    // 加密字符串值后存入cookie
    document.cookie = key + '=en:/str:' + crypto.en(val, key) + expires + '; path=/';
  }

  removeCookies (key) {
    var date = new Date();
    var val = this.getCookies(key);
    date.setTime(date.getTime() - 1);
    var expires = '; expires=' + date.toGMTString();
    if (val !== null) { document.cookie = key + '=' + val + expires + '; path=/'; }
  }
}

export default new Cookie();