/**
 * 
 * Cookie Models
 * 
 * Thanks:
 *      https://github.com/carhartl/jquery-cookie
 *      https://github.com/kissyteam/kissy/blob/master/src/cookie/src/cookie.js
 *      http://www.nczonline.net/blog/2009/05/05/http-cookies-explained/
 *
 * @author kidney<kidneyleung@gmail.com>
 *
 */
define("matcha/cookie/1.0.0/cookie-debug", [], function(require, exports, module) {
// Helper
var doc = window.document,
    MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000;

    function encode(str) {
        return encodeURIComponent(str);
    }
    function decode(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    }

    function isNotEmptyStr(str) {
        return (typeof str === 'string') && str !== '';
    }

    module.exports = {
        /**
         * get cookie value for given the name
         * @param {string} name - access to the specified value of the cookie
         * @param {object} options - config param
         *                      decode - it's use decodeURIComponent?
         * @return {string} - If name does not exist, will return undefined
         */
        get: function(name, options) {
            options = options || {};
            var ret, matchArr;

            if (isNotEmptyStr(name)) {
                if ((matchArr = String(doc.cookie).match(
                    new RegExp('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)')))) {
                    if (matchArr[1]) {
                        ret = !options.decode ? matchArr[1] : decode(matchArr[1]);
                    }
                }
            }
            return ret;
        },

        /**
         * set cookie for given name and at least value
         * @param {string} name - cookie name
         * @param {string|int} val - cookie values
         * @param {object} options - config param
         */
        set: function(name, val, options) {
            options = options || {};

            var text = String(options.encode ? encode(val) : val),
                date = options.expires, // 过期时间, 单位:天
                domain = options.domain, // 有效域名
                path = options.path, // 有效路径
                secure = options.secure; // 是否安全设置

            // 从当前时间开始，多少天后过期
            if (typeof date === 'number') {
                date = new Date();
                date.setTime(date.getTime() + options.expires * MILLISECONDS_OF_DAY);
            }

            // expiration date
            if (date instanceof Date) {
                text += '; expires=' + date.toUTCString();
            }

            // domain
            if (isNotEmptyStr(domain)) {
                text += '; domain=' + domain;
            }

            // path
            if (isNotEmptyStr(path)) {
                text += '; path=' + path;
            }

            // secure
            if (secure) {
                text += '; secure';
            }

            doc.cookie = name + '=' + text;
        },

        /**
         * delete cookie
         * @param {string} name
         * @param {object} options - config param
         */
        del: function(name, options) {
            this.set(name, '', {
                expires: -1,
                domain: options.domain,
                path: options.path,
                secure: options.secure
            });
        }
    };
});