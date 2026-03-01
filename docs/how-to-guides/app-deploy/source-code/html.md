---
title: 静态HTML
description: 在 Rainbond 上通过源代码部署纯静态 HTML 项目
---

## 概述

Rainbond 通过源码根目录是否存在 `index.html`（或 `index.htm`）且不存在 `package.json` 来识别为纯静态项目。

纯静态项目使用 [Paketo Nginx Buildpack](https://paketo.io/docs/howto/nginx/) 构建，自动配置 Nginx 作为 Web 服务器，无需 Node.js 环境。

## 项目结构

```
├── index.html          # 必须存在，入口文件
├── css/
├── js/
├── images/
└── nginx.conf          # 可选，自定义 Nginx 配置
```

## 自定义 Nginx 配置

如需要自定义 Nginx 配置，可以在项目根目录添加 `nginx.conf` 文件，构建时会覆盖默认配置。或者在平台上挂载配置文件到 `/workspace/nginx.conf`。

默认 `nginx.conf` 配置如下：

```conf
# Number of worker processes running in container
worker_processes 1;

# Run NGINX in foreground (necessary for containerized NGINX)
daemon off;

# Set the location of the server's error log
error_log stderr;

events {
  # Set number of simultaneous connections each worker process can serve
  worker_connections 1024;
}

http {
  client_body_temp_path /tmp/client_body_temp;
  proxy_temp_path /tmp/proxy_temp;
  fastcgi_temp_path /tmp/fastcgi_temp;

  charset utf-8;

  # Map media types to file extensions
  types {
    text/html html htm shtml;
    text/css css;
    text/xml xml;
    image/gif gif;
    image/jpeg jpeg jpg;
    application/javascript js;
    application/atom+xml atom;
    application/rss+xml rss;
    font/ttf ttf;
    font/woff woff;
    font/woff2 woff2;
    text/mathml mml;
    text/plain txt;
    text/vnd.sun.j2me.app-descriptor jad;
    text/vnd.wap.wml wml;
    text/x-component htc;
    text/cache-manifest manifest;
    image/png png;
    image/tiff tif tiff;
    image/vnd.wap.wbmp wbmp;
    image/x-icon ico;
    image/x-jng jng;
    image/x-ms-bmp bmp;
    image/svg+xml svg svgz;
    image/webp webp;
    application/java-archive jar war ear;
    application/mac-binhex40 hqx;
    application/msword doc;
    application/pdf pdf;
    application/postscript ps eps ai;
    application/rtf rtf;
    application/vnd.ms-excel xls;
    application/vnd.ms-powerpoint ppt;
    application/vnd.wap.wmlc wmlc;
    application/vnd.google-earth.kml+xml  kml;
    application/vnd.google-earth.kmz kmz;
    application/x-7z-compressed 7z;
    application/x-cocoa cco;
    application/x-java-archive-diff jardiff;
    application/x-java-jnlp-file jnlp;
    application/x-makeself run;
    application/x-perl pl pm;
    application/x-pilot prc pdb;
    application/x-rar-compressed rar;
    application/x-redhat-package-manager  rpm;
    application/x-sea sea;
    application/x-shockwave-flash swf;
    application/x-stuffit sit;
    application/x-tcl tcl tk;
    application/x-x509-ca-cert der pem crt;
    application/x-xpinstall xpi;
    application/xhtml+xml xhtml;
    application/zip zip;
    application/octet-stream bin exe dll;
    application/octet-stream deb;
    application/octet-stream dmg;
    application/octet-stream eot;
    application/octet-stream iso img;
    application/octet-stream msi msp msm;
    application/json json;
    audio/midi mid midi kar;
    audio/mpeg mp3;
    audio/ogg ogg;
    audio/x-m4a m4a;
    audio/x-realaudio ra;
    video/3gpp 3gpp 3gp;
    video/mp4 mp4;
    video/mpeg mpeg mpg;
    video/quicktime mov;
    video/webm webm;
    video/x-flv flv;
    video/x-m4v m4v;
    video/x-mng mng;
    video/x-ms-asf asx asf;
    video/x-ms-wmv wmv;
    video/x-msvideo avi;
  }

  access_log /dev/stdout;

  # Set the default MIME type of responses; 'application/octet-stream'
  # represents an arbitrary byte stream
  default_type application/octet-stream;

  # (Performance) When sending files, skip copying into buffer before sending.
  sendfile on;
  # (Only active with sendfile on) wait for packets to reach max size before
  # sending.
  tcp_nopush on;

  # (Performance) Enable compressing responses
  gzip on;
  # For all clients
  gzip_static always;
  # Including responses to proxied requests
  gzip_proxied any;
  # For responses above a certain length
  gzip_min_length 1100;
  # That are one of the following MIME types
  gzip_types
    text/plain
    text/css
    text/js
    text/xml
    text/javascript
    application/javascript
    application/x-javascript
    application/json
    application/xml
    application/xml+rss
    font/eot
    font/otf
    font/ttf
    image/svg+xml;
  # Compress responses to a medium degree
  gzip_comp_level 6;
  # Using 16 buffers of 8k bytes each
  gzip_buffers 16 8k;

  # Add "Vary: Accept-Encoding” response header to compressed responses
  gzip_vary on;

  # Decompress responses if client doesn't support compressed
  gunzip on;

  # Don't compress responses if client is Internet Explorer 6
  gzip_disable "msie6";

  # Set a timeout during which a keep-alive client connection will stay open on
  # the server side
  keepalive_timeout 30;

  # Ensure that redirects don't include the internal container PORT - <%=
  # ENV["PORT"] %>
  port_in_redirect off;

  # (Security) Disable emitting nginx version on error pages and in the
  # “Server” response header field
  server_tokens off;

  server {
    listen 8080 default_server;
    server_name _;

    # Directory where static files are located
    root /workspace/dist;

    location / {
      # Send the content at / in response to *any* requested endpoint
      if (!-e $request_filename) {
        rewrite ^(.*)$ / break;
      }

      # Specify files sent to client if specific file not requested (e.g.
      # GET www.example.com/). NGINX sends first existing file in the list.
      index index.html index.htm Default.htm;
    }

    # (Security) Don't serve dotfiles, except .well-known/, which is needed by
    # LetsEncrypt
    location ~ /\.(?!well-known) {
      deny all;
      return 404;
    }
  }
}
```

## 部署示例

1. 基于源码创建组件 → 默认使用 2048-demom → 直接确认即可
2. Rainbond 自动识别为纯静态项目
3. 构建并部署

> 如果项目同时存在 `package.json` 和 `index.html`，Rainbond 会识别为 NodeJS 项目而非纯静态项目。请参考 [NodeJS 前后端项目部署](./nodejs.md)。
