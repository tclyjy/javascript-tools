'use strict';

class Crypto {
  base64 = {
    en (a) {
      for (var e, f, g, b = '', c = 0, d = a.length, h =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; d > c;) {
        if (e = 255 & a.charCodeAt(c++), c === d) {
          b += h.charAt(e >> 2), b += h.charAt((3 & e) << 4), b += '==';
          break;
        }
        if (f = a.charCodeAt(c++), c === d) {
          b += h.charAt(e >> 2), b += h.charAt((3 & e) << 4 | (240 & f) >> 4), b += h.charAt((15 & f) << 2),
            b += '=';
          break;
        }
        g = a.charCodeAt(c++), b += h.charAt(e >> 2), b += h.charAt((3 & e) << 4 | (240 & f) >> 4),
          b += h.charAt((15 & f) << 2 | (192 & g) >> 6), b += h.charAt(63 & g);
      }
      return b;
    },

    de (a) {
      for (var b, c, d, e, f = 0, g = a.length, h = '', i = [-1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58,
        59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1,
      -1, -1, -1]; g > f;) {
        do { b = i[255 & a.charCodeAt(f++)]; } while (g > f && b === -1);
        if (b === -1) { break; }
        do { c = i[255 & a.charCodeAt(f++)]; } while (g > f && c === -1);
        if (c === -1) { break; }
        h += String.fromCharCode(b << 2 | (48 & c) >> 4);
        do {
          if (d = 255 & a.charCodeAt(f++), d === 61) { return h; }
          d = i[d];
        } while (g > f && d === -1);
        if (d === -1) { break; }
        h += String.fromCharCode((15 & c) << 4 | (60 & d) >> 2);
        do {
          if (e = 255 & a.charCodeAt(f++), e === 61) { return h; }
          e = i[e];
        } while (g > f && e === -1);
        if (e === -1) { break; }
        h += String.fromCharCode((3 & d) << 6 | e);
      }
      return h;
    }
  }

  en (oldStr, key) {
    if (!oldStr) { return false; }
    // 如果没有key, 取一个随机数做为密钥
    key = key || this.random();
    // 将经过url编码的字符串进行base64位编码
    var str = this.base64.en(encodeURIComponent(oldStr));
    // 加密操作
    var keyLen = key.length;
    var strLen = str.length;
    var newStr = '';
    var i = 0;
    for (; i < strLen; i += 1) {
      newStr += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % keyLen));
    }
    // 如果有key, 传出base64编码后的加密字符串, 如果没有key, 传出加密字符串与key
    return key ? this.base64.en(newStr) : {
      str: this.base64.en(newStr),
      key: key
    };
  }

  de (str, key) {
    str = this.base64.de(str);
    var keyLen = key.length;
    var strLen = str.length;
    var newStr = '';
    var i = 0;
    for (; i < strLen; i += 1) {
      newStr += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % keyLen));
    }
    return decodeURIComponent(this.base64.de(newStr));
  }

  random (num = 6) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < num; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return text;
  }
}

export default new Crypto();