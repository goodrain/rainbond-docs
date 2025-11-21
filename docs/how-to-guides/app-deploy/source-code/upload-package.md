---
title: 上传本地软件包部署
description: 在 Rainbond 中通过上传软件包部署应用的完整指南
keywords:
- Rainbond 软件包部署
- 上传 JAR 包
- 上传 WAR 包
- 上传 ZIP 包
- 前端构建包部署
---

## 概述

Rainbond 支持通过上传本地软件包的方式快速部署应用,无需连接代码仓库。这种方式适用于已经在本地完成构建的项目,或者需要快速部署预编译软件包的场景。

## 支持的软件包类型

Rainbond 支持以下三种软件包格式:

| 包类型 | 适用场景 | 说明 |
|--------|----------|------|
| **JAR** | Java SpringBoot 应用 | 可直接运行的 SpringBoot Jar 包 |
| **WAR** | Java Web 应用 | 需要在 Servlet 容器中运行的 Web 应用 |
| **ZIP** | 前端静态资源 | 前端构建后的静态资源包 |

## 软件包要求

### JAR 包要求

- 必须是可执行的 SpringBoot Jar 包
- 包含完整的依赖和运行时文件

### WAR 包要求

- 符合 Java Servlet 规范的 Web 应用包
- 将在 Tomcat 或 Jetty 等容器中运行
- 确保 WEB-INF 目录结构完整

### ZIP 包要求

ZIP 包是前端项目构建后的静态资源包,**必须满足以下结构要求**:

```
package.zip
└── dist/           # 必须包含 dist 文件夹
    ├── index.html
    ├── static/
    │   ├── js/     # JavaScript 文件
    │   ├── css/    # CSS 样式文件
    │   └── img/    # 图片资源
    └── ...         # 其他静态资源
```

:::warning 重要提示
- ZIP 包解压后**必须包含 dist 文件夹**
- dist 文件夹下必须包含 index.html 或其他 HTML 入口文件
- dist 文件夹下包含 js、css、img 等静态资源
- 如果 ZIP 包结构不符合要求,部署将会失败
:::

## 操作步骤

1. 进入目标团队和应用
2. 点击 **新建 → 从源码构建 → 软件包**
3. 点击 **上传软件包** 按钮，选择本地的 JAR、WAR 或 ZIP 文件
4. 等待文件上传完成并确认构建

> - 上传大文件时请保持网络连接稳定
> - 上传过程中可以看到上传进度

## 运行环境配置

### 1. JAR 包配置

对于 JAR 包,可以在 **高级设置 → 构建源** 页面配置以下参数:

| 配置项 | 说明 |
|--------|------|
| **OpenJDK版本** | 选择 Java 运行时版本: 1.8, 11, 17, 21 等 |
| **启动命令** | 自定义 JAR 包启动命令,默认为 `java -jar app.jar` |
| **JVM参数** | 设置 JVM 运行参数,如 `-Xmx1024m -Xms512m` |

示例启动命令:
```bash
java -Xmx2048m -Xms1024m -jar app.jar --server.port=8080
```

### 2. WAR 包配置

对于 WAR 包,可以配置:

| 配置项 | 说明 |
|--------|------|
| **OpenJDK版本** | 选择 Java 版本 |
| **Web服务器** | 选择容器: tomcat7, tomcat8, tomcat85, tomcat9, jetty7, jetty9 |

### 3. ZIP 包配置

ZIP 包部署后会自动识别为静态网站,使用 Nginx 提供服务。

**默认 Nginx 配置**:
```nginx
server {
    listen 5000;
    
    location / {
        root   /app/www;
        index  index.html index.htm;
    }
}
```

**自定义 Nginx 配置**:

如果需要自定义 Nginx 配置，在组件 → 环境配置 → 添加配置文件，示例如下:
1. 配置文件名称：conf
2. 配置文件路径：/app/nginx/conf.d/web.conf
3. 权限：777
4. 内容：自定义 Nginx 配置内容

`web.conf` 示例:
```bash
server {
    listen       5000;

    # 开启 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        root   /app/www;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # API 代理配置
    location /api {
        proxy_pass http://backend-service:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4. 端口配置

部署完成后,需要配置端口以对外提供服务:

1. 进入**组件 → 高级设置 → 端口**，添加端口
2. 根据应用类型添加端口:
   - **JAR 包 (SpringBoot)**: 通常为 8080 或 application.properties 中配置的端口
   - **WAR 包**: 默认 8080 (Tomcat) 或 8080 (Jetty)
   - **ZIP 包**: 默认 5000 端口


## 常见问题

### 前端 ZIP 包部署后页面路由 404

SPA 应用的路由需要特殊配置。在 ZIP 包中添加 `web.conf` 文件,配置 try_files:

```nginx
server {
    listen       80;
    location / {
        root   /app/www/dist;
        index  index.html index.htm;
        # 支持 Vue/React 等 SPA 的路由
        try_files $uri $uri/ /index.html;
    }
}
```

### 上传后想更新软件包怎么办?

**解决方案**:
1. 进入组件 → 构建源
2. 点击 **重新上传软件包**
3. 上传新版本的文件
4. 点击 **构建** 部署新版本

:::warning 注意
前端 ZIP 包更新后，需要点击构建源的**重新检测**按钮，否则不会解压新的 ZIP 包内容
:::
