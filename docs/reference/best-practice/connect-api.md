---
title: Vue、React项目如何调用后端接口
weight: 4004
---

### 前言
部署 Vue 、React 项目请参考 Rainbond部署Vue、React项目

以往我们在部署前端项目后，调用后端接口有以下几种场景：

1. 后端接口没有统一，比较分散，例如：`/system/user`,`/tool/gen` 。

   通常我们会在项目的全局配置文件` .env.production`中直接写入后端ip，例如：

   ```shell
   ENV = 'production'
   VUE_APP_BASE_API = '192.168.6.66:8080'
   ```

   这样写虽可以正常访问，但会导致产生**跨域问题**。

2. 后端接口统一，例如：`/api/system/user`, `/api/tool/gen`。

   大部分小伙伴也还是同样会直接把**IP** + **后缀**写入到项目全局配置文件，例如：

   ```shell
   ENV = 'production'
   VUE_APP_BASE_API = '192.168.6.66:8080/api'
   ```

   这样写当然了也会有**跨域**的问题。

那我们该怎么解决接口不统一或接口统一的**跨域**问题呢。

​	答：使用**Nginx 反向代理**。

​    大部分小伙伴用nginx都是项目打包完的`dist`包丢进nginx，配置个 location proxy_pass 反向代理后端，然后在项目全局配置里填写`Nginx`地址。酱紫还是会跨越哦😋。那究竟该怎么处理呢，请往下看👇



### 解决跨域对于不同的场景有以下几种方法：

#### 接口没有统一

1. 接口数量较少的话，比如只有几个接口`system` `tool` `moitor` `login` `getmenu`等。

   首先需要修改全局配置文件`.env.production` 的请求api 为**/**，酱紫写前端发起请求的时候会直接转发到nginx。

   ```shell
   ENV = 'production'
   VUE_APP_BASE_API = '/'
   ```

   其次修改**Nginx**配置文件，添加多个**location**，在浏览器请求的时候就会匹配到nginx的location规则，例如：

   ​		浏览器请求菜单：`http://192.168.6.66/getmenu`，会匹配 **location /getmenu**规则反向代理到后端。

   ```shell
   server {
         listen       5000;
     		#静态页面
         location / {
             root   /app/www;
             try_files $uri $uri/ /index.html;
             index  index.html index.htm;
         }
         
         location /getmenu{
             proxy_pass http://127.0.0.1:8080/;
         }
     }
   ```

   这种方式固然可以，但对于接口几十个上百个 一一配置很麻烦。

2. 接口数量很多。

   同样首先也需要修改全局配置文件`.env.production`，修改请求接口为 api，这个接口自定义的。有的小伙伴就疑问了，我没有这个接口呀，请接着往下看。

   ```shell
   ENV = 'production'
   VUE_APP_BASE_API = '/api'
   ```

   紧接着修改**Nginx**配置文件，在nginx配置文件中添加了**location /api**，并且添加了 **rewrite**、**proxy_pass**，这个 **rewrite**是URL重写。

   例如：请求 `http://192.168.6.66/api/system/menu`，酱紫请求正常情况发送到后端，后端会报错是没有这个接口的。

   我们通过**rewrite** 重写URL，此时URL就会变成`http://192.168.6.66/system/menu`并且通过`proxy_pass`反向代理到后端，此时发送接口请求`/system/menu`，后端正常返回。

   ```shell
   server {
       listen       5000;
   
       location / {
           root   /app/www;
           try_files $uri $uri/ /index.html;
           index  index.html index.htm;
       }
   
       location  /api {
           rewrite ^/api/(.*)$ /$1 break;
           proxy_pass http://192.168.2.182:8080;
       }
   }
   ```

   `rewrite ^/api/(.*)$ /$1 break`具体可参考[Nginx官方文档rewrite_module模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)，在这里简单介绍下：

   ​		rewrite	^/api/(.*)$	/$1 				break

   ​		关键字    	正则           替代内容     	flag标记

   

#### 接口统一

对于这种就比较好处理了。

同样首先也是修改项目的全局配置文件`.env.production`，修改请求接口为 **/prod-api**。这个统一接口是后端提供的哈。

```bash
ENV = 'production'
VUE_APP_BASE_API = '/prod-api'
```

修改**Nginx**配置文件，增加一条**location**，反向代理到后端地址。

此时在浏览器请求的URL则为：`http://192.168.6.66/prod-api/system/menu`。

```conf
server {
    listen       5000;

    location / {
        root   /app/www;
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }

    location  /prod-api {
        proxy_pass http://192.168.2.182:8080;
    }
}
```
