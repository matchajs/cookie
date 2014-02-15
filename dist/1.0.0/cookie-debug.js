/**
 * 
 * Cookie Models
 * 
 * Thanks:
 *  - https://github.com/carhartl/jquery-cookie
 *  - https://github.com/kissyteam/kissy/blob/master/src/cookie/src/cookie.js
 *  - http://www.nczonline.net/blog/2009/05/05/http-cookies-explained/
 *
 * @author kidney<kidneyleung@gmail.com>
 *
 */
define("matcha/cookie/1.0.0/cookie-debug", [], function(require, exports, module) {
    module.exports = {
        /**
         * 获取cookie值
         *
         * @param name
         * @param options
         * @returns {*}
         */
        get: function(name, options) {
            options = options || {};
            var ret, matchArr;
            if (isNotEmptyStr(name)) {
                if (matchArr = String(doc.cookie).match(new RegExp("(?:^| )" + name + "(?:(?:=([^;]*))|;|$)"))) {
                    if (matchArr[1]) {
                        ret = !options.decode ? matchArr[1] : decode(matchArr[1]);
                    }
                }
            }
            return ret;
        },
        /**
         * 设置cookie
         *
         * @param name
         * @param val
         * @param options
         * @returns {*|string}
         */
        set: function(name, val, options) {
            options = options || {};
            var text = String(options.encode ? encode(val) : val), date = options.expires, // 过期时间, 单位:天
            domain = options.domain, // 有效域名
            path = options.path, // 有效路径
            secure = options.secure;
            // 是否安全设置
            // 从当前时间开始，多少天后过期
            if (typeof date === "number") {
                date = new Date();
                date.setTime(date.getTime() + options.expires * MILLISECONDS_OF_DAY);
            }
            // expiration date
            if (date instanceof Date) {
                text += "; expires=" + date.toUTCString();
            }
            // domain
            if (isNotEmptyStr(domain)) {
                text += "; domain=" + domain;
            }
            // path
            if (isNotEmptyStr(path)) {
                text += "; path=" + path;
            }
            // secure
            if (secure) {
                text += "; secure";
            }
            doc.cookie = name + "=" + text;
            return text;
        },
        /**
         * 删除cookie
         * @param name
         * @param options
         * @returns {*|string}
         */
        del: function(name, options) {
            return this.set(name, "", {
                expires: -1,
                domain: options.domain,
                path: options.path,
                secure: options.secure
            });
        }
    };
    // Helpers
    var doc = window.document;
    var MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1e3;
    function encode(str) {
        return encodeURIComponent(str);
    }
    function decode(str) {
        return decodeURIComponent(str.replace(/\+/g, " "));
    }
    function isNotEmptyStr(str) {
        return typeof str === "string" && str !== "";
    }
});
