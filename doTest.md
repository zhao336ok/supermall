## 目录结构



## 创建命令

- 创建项目

```
vue create supermall
```

- 添加路由

```
npm install vue-router --save
```

- 添加axios网络模块

```
npm install axios --save
```

- 安装better-scroll

```
npm install better-scroll --save
```

- 懒加载

```
npm install vue-lazyload --save
```

- 解决移动端延迟300ms问题

```
npm install fastclick --save
```

- 安装vuex

```
npm install vuex --save
```

- px转换为viewpoart

```
npm install postcss-px-to-viewport --save-dev
```

## vue项目线上页面刷新报404 解决方法

- 修改nginx配置文件

```
location / {
root ...
index ...
try_files $uri $uri/ /index.html; ---解决页面刷新404问题
}
```



