#Cookie

提供 Cookie 操作方法

---


##使用说明

###set `Cookie.set(name, val, options)`

设置cookie

**参数**

1. `name` - *(string)* cookie名
2. `val` - *(number|string)* cookie值
3. `options` - *(object)* 高级配置，有以下功能：
    - `encode` - *(boolean)* 是否进行编码
    - `expires` - *(number)* 过期时间, 单位:天
    - `domain` - *(string)* 有效域名
    - `path` - *(string)* 有效路径
    - `secure` - *(boolean)* 是否安全设置

例子：
```js
define(function(require, exports, module) {
    var Cookie = require('cookie');

    Cookie.set('age', '25', {
        expires: 7,
        domain: 'matchajs.org',
        path: '/'
    });

    Cookie.set('job', 'front end engineer', {
        encode: true,
        expires: 7,
        domain: 'matchajs.org',
        path: '/'
    });
});
```

###get `Cookie.get(name[, options])`

获取指定cookie

**参数**

1. `name` - *(string)* cookie名
2. `options` - *(object)*  高级配置，有以下功能：
    - `encode` - *(boolean)* 是否进行解码

例子：
```js
define(function(require, exports, module) {
    var Cookie = require('cookie');

    Cookie.get('age'); // return 25

    Cookie.get('job'); // return front%20end%20engineer

    Cookie.get('job', {
        decode: true
    }); // return front end engineer
});
```

###del `Cookie.del(name[, options])`

删除指定cookie

**参数**

1. `name` - *(string)*  cookie名
2. `options` - *(boolean)*  高级配置，有以下功能：
    - `domain`  - *(string)* 有效域名
    - `path` - *(string)*  有效路径
    - `secure` - *(boolean)*  是否安全设置

例子：
```js
define(function(require, exports, module) {
    var Cookie = require('cookie');

    Cookie.get('age'); // return 25
    Cookie.del('age');
    Cookie.get('age'); // return undefined
});
```