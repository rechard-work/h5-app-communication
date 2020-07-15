# h5-app-communication

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


## postcss-pxtorem：转换px为rem的插件

### 一、自动设置根节点html的font-size

因为rem单位是相对于根节点的字体大小的，所以通过设置根节点的字体大小可以动态的改变rem的大小。

* 1、创建rem.js文件

```
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      //var clientWidth = docEl.clientWidth;
      var rem = docEl.clientWidth / 10;
      if (!rem) return;
      //docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
      docEl.style.fontSize = rem + 'px';
    };
    recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

```
* 2、在main.js中引入rem.js
```
2.1. 引入文件后，查看页面的html节点，是否有被自动添加 font-size。
2.2. 注意：完成到这一步，也就是实现了rem布局，实际开发的时候，还是需要我们去计算对应的rem值去开发。
2.3. 下一步我们就配置一下webpack，自动转换px为对应的rem值。

```
### 二、配置 postcss-pxtorem 自动转换px为rem

```
 1、安装 postcss-pxtorem
 
 # npm install postcss-pxtorem -D
 
 2、修改根目录 .postcssrc.js 文件
 
 # 找到 plugins 属性新增pxtorem的设置
 # "postcss-pxtorem": { "rootValue": 32, "propList": ["*"] }
 # 按照上述配置项目后，即可在开发中直接使用 px 单位开发
 ```
 ## H5与App之间通讯桥梁JSBridge
 
 * 新建[jsBridge.js](https://github.com/rechard-work/h5-app-communication/blob/master/src/common/js/jsBridge.js)文件
 * main.js引入jsBridge.js文件，并挂在$bridge 
 ```
 # 1. js调app方法
 # Vue.prototype.$bridge = window.hxWebBridge
 /*
 * name       app定义的名字
 * params     H5传给app的参数
 * callback   app回调的数据
 */
 # this.$bridge.postNotification(name, params,callback)
 
 # 2. app调js方法
 # this.$bridge.registerHandler(name, (datas, responseCallback) => {
    // 执行的函数
   })
 ```
