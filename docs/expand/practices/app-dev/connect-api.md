---
title: Vue、React项目如何调用后端接口
weight: 4004
---

### 前言
部署 Vue 、React 项目请参考 [Rainbond部署Vue、React项目](./build-react-and-vue)

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

```shell
ENV = 'production'
VUE_APP_BASE_API = '/prod-api'
```

修改**Nginx**配置文件，增加一条**location**，反向代理到后端地址。

此时在浏览器请求的URL则为：`http://192.168.6.66/prod-api/system/menu`。

```shell
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



跨域问题解决了，那我们开始实践一次😁。

本次前端的配置就是上面说的**接口统一**的方式

接下来部署一个SpringBoot后端项目来配合前端一起使用。

### 源码部署后端

* 本项目源码地址`https://gitee.com/zhangbigqi/RuoYi-Vue.git` Fork开源项目 [若依](https://gitee.com/y_project/RuoYi-Vue.git)

* 后端是**SpringBoot + Mysql + Redis** 架构。

#### Dockerfile源码构建部署Mysql

参考博客文章[Rainbond 中用 Dockerfile 便捷构建运行应用](./build_by_dockerfile)

1. 通过Dockerfile源码构建部署Mysql。参考文档[Dockerfile源码构建](/docs/use-manual/component-create/language-support/dockefile)

   ​	Dockerfile源码构建需要在项目所需Sql目录放置`Dockerfile文件`自动初始化数据库。

   ​	Dockerfile文件可参考`https://gitee.com/zhangbigqi/RuoYi-Vue.git` 此项目下的 `sql` 目录

2. 填写源码仓库地址，填写Mysql子目录 `sql`，构建Mysql。

3. 确认创建组件，平台会自动识别语言为 **dockerfile**。

4. 创建，等待构建组件完成即可。

5. 构建完成后，在组件 > 端口中打开对内服务并且修改 `别名`，点击即可修改，改为`MYSQL_HOST`,以供后端连接时使用。



#### Docker镜像部署Redis

1. 通过 docker镜像部署redis，具体参考官方文档[docker镜像构建](/docs/use-manual/component-create/image-support/image)

2. 使用 redis 官方镜像，redis:latest

3. 确认创建，平台会检测出来一些镜像信息，直接创建即可。

4. 构建完成后，在组件 > 端口中打开对内服务。以供后端连接使用

#### Java源码构建部署 SpringBoot

1. 这里提前修改了后端项目里的配置文件 `ruoyi-admin/src/main/resources/application-druid.yml`连接数据库的配置，改为了环境变量连接，这里就用到了上面修改的端口别名。以及修改了`ruoyi-admin/src/main/resources/application.yml`文件中的连接Redis配置

   ```shell
   # 主库数据源
     master:
         url: jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/ry-vue?
     redis:
         # 地址
         host: 127.0.0.1
         # 端口，默认为6379
         port: 6379
   ```

2. 通过Java源码构建项目，具体参考官方文档[JAVA源码构建](/docs/use-manual/component-create/language-support/java/java-maven)

3. 填写源码仓库地址，构建SpringBoot项目。

4. 平台会根据项目根目录的 `pom.xml` 文件检测是什么项目，这里检测的是多模块项目。

5. 进入多模块构建，勾选`ruoyi-admin`模块，此模块是可运行的，其他模块都是依赖。具体模块功能参考[若依官方文档](https://doc.ruoyi.vip/)

6. 可修改Maven构建参数，无特殊要求无需修改。

7. 确认创建，等待构建完成。

   ​	这里需要注意，平台默认使用**openjdk** ，此项目需要使用**oraclejdk**来生成前端验证码。

   ​	需要在`组件 > 构建源`中修改 `JDK类型`为自定义JDK，填写自定义JDK下载路径。

   > 自定义JDK下载地址：https://buildpack.oss-cn-shanghai.aliyuncs.com/jdk/jdk1.8.0.tgz

* 需要打开 **禁用缓存按钮**，防止包不一样出现奇奇怪怪的问题。构建成功后再把禁用缓存关闭，下次构建就缓存正确的包了。


* 修改后 **保存修改**。构建组件，等待构建完成，修改端口为 `8080` 。
* 进入拓扑图界面，切换为编辑模式，建立组件依赖关系。
  * **ruoyi-ui **连接 **ruoyi-admin**。
  * **ruoyi-admin **连接 **Mysql**、**Redis**。
* 更新组件`ruoyi-ui` `ruoyi-admin`，至此完成。
* 最终效果，拓扑图：

![tuoputu](https://static.goodrain.com/docs/practice/Vue-SpringBoot-Mysql/tuoputu.png)

* 页面效果：

![ym](https://static.goodrain.com/docs/practice/Vue-SpringBoot-Mysql/ym.png)

