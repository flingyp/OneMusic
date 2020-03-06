# onemusic

> A Vue.js project

## Build Setup

``` bash
# 安装相关依赖包
npm install

# 开发运行
npm run dev

# 打包
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 具体实现功能

### 基本骨架

1. 初始化项目安装几个包   babel-polyfill  babel-runtime  fastclick   reset.css  border.css
2. 使用了 iconfont图标库  改变了标题的字体样式   global.css
3. 设置 推荐 歌手 排行 页面的路由 和 重定向功能

### 推荐页面

1. 推荐页面的轮播图
  1. 安装使用了 `Vue-Awesome-Swiper` 轮播插件2.6.7版本的 最新版本现在坑有点多
  2. 安装使用了 `axios` 来请求数据 
2. 推荐歌单 推荐歌曲
  1. 样式和数据的添加
  2. 增加了 loading 单文件组件 当数据没有得到前 显示正在加载中 样式
  3. 增加了图片懒加载

### 歌手页面
1. 页面基本功能实现

### 歌手详情页面
1. 歌手详情页面 作为 歌手页面的子路由
2. 因为自己的问题那个better-scroll用的不是很好 后面的交互体验就没有去弄了然后还遗留了一个小问题
3. 太难了！！！！！！！

### 播放器
1. 通过Vuex实现管理相关播放器配置数据 
2. 给播放器界面设置简单的动画过渡
3. 歌曲播放和控制歌曲播放（暂停 播放）和 歌曲图片旋转动画功能实现
4. 实现歌曲 上一首 下一首播放 和 获取歌曲时间 功能 
5. 实现进度条跟随音乐的功能 点击 拖拽 进度条功能
6. 播放器的播放模式切换功能 
7. 简单的优化了请求歌曲的URL不存在为null时歌曲是不能播放的 这时候提示用户歌曲不能播放的弹出框`查找不到歌曲的音源`的信息
8. 歌词显示部分的功能不写了。 
9. 播放器这个版块有点难也有点烦。。。有很多小问题在里面，但是耐心和实力还有时间摆在那里，所以就决定这样了吧

### 歌单页面
1. 推荐页面的推荐歌单 和 推荐新音乐 数据处理 通过 Vuex 管理数据 和 播放器结合应用
### 排行榜及详情页

### 搜索页面

### 歌曲列表页面

### 用户中心页面

## 数据和数据接口API
  * 数据调用的是 **NeteaseCloudMusicApi(网易云音乐 NodeJS 版 API)**
  * https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi
  * 感谢数据接口的提供！！！

## 为何做这个？
  * 刚刚学完 Vue这个框架 体验到了数据驱动视图 MVVM思想， 但是那时候没有感受到它的强大之处
  * 然后在知乎看到 [Vue 实现网易云音乐 WebApp](https://zhuanlan.zhihu.com/p/36889981) 这篇文章
  * 就决定去按照它的样式模板自己去写一个了
  * 然后就是发现有这个 数据的提供 就觉得很舒服 完全不用顾及 数据的提供


