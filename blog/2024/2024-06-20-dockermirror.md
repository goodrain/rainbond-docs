---
title: 从 Docker Hub 拉取镜像受阻？这些解决方案帮你轻松应对
description: 最近一段时间 Docker 镜像一直是 Pull 不下来的状态，感觉除了挂🪜，想直连 Docker Hub 是几乎不可能的。更糟糕的是，很多原本可靠的国内镜像站，例如一些大厂和高校运营的，也陆续关停了，这对我们这些个人开发者和中小企业来说是挺难受的。之前，通过这些镜像站，我们可以快速、方便地获取所需的 Docker 镜像，现在这条路也不行了。感觉这次动作不小，以后想直接访问 Docker Hub 是不可能了。所以我们得想办法搭建自己的私有镜像仓库。
slug: dockermirror
---


最近一段时间 Docker 镜像一直是 Pull 不下来的状态，感觉除了挂🪜，想直连 Docker Hub 是几乎不可能的。更糟糕的是，很多原本可靠的国内镜像站，例如一些大厂和高校运营的，也陆续关停了，这对我们这些个人开发者和中小企业来说是挺难受的。之前，通过这些镜像站，我们可以快速、方便地获取所需的 Docker 镜像，现在这条路也不行了。感觉这次动作不小，以后想直接访问 Docker Hub 是不可能了。所以我们得想办法搭建自己的私有镜像仓库。

最近网上有很多解决 Docker Hub 镜像拉不下来的文章，我大概总结一下有以下几种办法：

### Github Action

利用 Github Action Job 将 Docker Hub 镜像重新打 Tag 推送到阿里云等其他公有云镜像仓库里，这对于需要单个镜像很方便，批量就稍微麻烦一些，如果没🪜Github 访问也是个问题。

### CloudFlare Worker

使用 CloudFlare Worker 对 Docker Hub 的访问请求做中转，这种也是最近使用比较多的，因为个人用户的免费计划每天有10万次免费请求，足够个人和中小企业使用了，实在不够可以花 5$ 购买不限制的。Worker 脚本在网上有很多，随便搜索都有示例。

因为 CloudFlare Worker 默认分配的`workers.dev`结尾的域名国内根本解析不了，所以要把域名托管在 CloudFlare 上才能正常使用，可以购买 `.xyz` 等其他费用合适的域名专门用来做代理访问。

但 CloudFlare Worker CDN 经常抽风，有时很快有时很慢，可以借助[自选优选IP工具](https://github.com/XIU2/CloudflareSpeedTest)帮助获取访问 CloudFlare 延迟最低的IP，将其写入到你的本地 Hosts 文件中。

### 自建镜像仓库

说到自建首先我想到的就是买个配置比较低国外的服务器，搭建个 Nginx 做代理，分享下我配置成功的 Nginx 配置文件：

```bash
server {
  listen 443 ssl;
  server_name 域名;
  ssl_certificate 证书地址;
  ssl_certificate_key 密钥地址;

  ssl_session_timeout 24h;
  ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;

  location / {
    proxy_pass https://registry-1.docker.io;  # Docker Hub 的官方镜像仓库
    proxy_set_header Host registry-1.docker.io;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_set_header Authorization $http_authorization;
    proxy_pass_header  Authorization;
    proxy_intercept_errors on;
    recursive_error_pages on;
    error_page 301 302 307 = @handle_redirect;
  }
  location @handle_redirect {
    resolver 1.1.1.1;
    set $saved_redirect_location '$upstream_http_location';
    proxy_pass $saved_redirect_location;
  }
}
```

然后就可以直接用 `docker pull 域名/library/nginx:latest` 获取镜像了或者配置到 Docker 的`daemon.json`中。

Nginx 代理的方案你需要能购买到合适的国外服务器，不然网络会很慢。

又或者在国外服务器上搭建 Registry、Nexus、Harbor等镜像仓库，它们具备镜像缓存功能，如果私有镜像仓库中不存在则会去代理服务中获取最新镜像。

## 建议方案

所以对于个人用户、中小企业来说可以将上述的 `CloudFlare Worker` + `自建镜像仓库` 融合起来，本地搭建 Registry、Nexus、Harbor等镜像仓库，在镜像仓库中配置上自己的 `CloudFlare Worker` `Nginx反代` 等代理地址或者当前一些可用的其他代理，当本地不存在则会通过这些代理去获取镜像，代理不可用时本地依然能用。

### 搭建 Docker Registry

搭建 Docker Registry 可以参考下述命令：

```bash
docker run -d --restart=always --name registry \
-p 443:443
-e REGISTRY_PROXY_REMOTEURL=https://registry-1.docker.io \ #代理的镜像仓库URL
-e REGISTRY_HTTP_ADDR=0.0.0.0:443 \ #监听地址
-e REGISTRY_HTTP_HOST=https://xxx.cn \ #访问域名
-e REGISTRY_HTTP_TLS_CERTIFICATE=/opt/cert/cert.pem \ #域名证书
-e REGISTRY_HTTP_TLS_KEY=/opt/cert/cert.key \ #域名证书
-v /opt/cert:/opt/cert \ #挂载本地证书到容器中
-v /data:/var/lib/registry \ #持久化数据目录
registry:2
```

### 搭建 Nexus

可选择使用 Docker 命令搭建 [Nexus](https://github.com/sonatype/docker-nexus3)。

```
docker run -d -p 8081:8081 --name nexus sonatype/nexus3
```

或者使用 [Rainbond](https://www.rainbond.com/docs/quick-start/quick-install) 应用商店一键安装。

![](https://static.goodrain.com/wechat/docker-proxy/1.png)

搭建完成后正常登录 Nexus 页面，根据页面引导配置 Docker 相关的存储 Repository 及代理 Repository 即可。

### 搭建 Harbor

可参考 [Harbor文档 ](https://goharbor.io/docs/2.11.0/install-config/)搭建或者使用 [Rainbond](https://www.rainbond.com/docs/quick-start/quick-install) 应用商店一键安装。

![](https://static.goodrain.com/wechat/docker-proxy/2.png)

## 可用的镜像代理

最近十来天我尝试了很多镜像加速站，整理了以下镜像站目前是可用状态，但可能随时会遇到不可用、关停、访问比较慢的状态，建议同时配置多个镜像源。

| 提供商         | 地址                                       |                |
| -------------- |------------------------------------------| -------------- |
| DaoCloud       | https://docker.m.daocloud.io             |                |
| 阿里云         | https://\<your_code>.mirror.aliyuncs.com | 登录阿里云分配 |
| Docker镜像代理 | https://dockerproxy.com                  | 看运气         |
| 百度云         | https://mirror.baidubce.com              |                |
| 南京大学       | https://docker.nju.edu.cn                |                |
| 中科院         | https://mirror.iscas.ac.cn               |                |

## 福利

近期 Rainbond 社区也接受到许多用户反馈 Docker 镜像拉不下来，不能构建、打包了，因此 Rainbond 也搭建了个镜像加速服务，采用 `CloudFlare + 国外服务器 Nginx 反代`的方案为 Rainbond 社区的用户们提供镜像加速服务。

![](https://static.goodrain.com/wechat/docker-proxy/3.png)

目前速度挺快的（未来不好说

### 使用方法

1.直接获取 Docker Hub 镜像

```bash
docker pull docker.rainbond.cc/library/node:20
docker pull docker.rainbond.cc/rainbond/rainbond:v5.17.2-release-allinone
```

2.配置镜像加速器

```bash
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://docker.rainbond.cc"]
}
EOF
systemctl daemon-reload
systemctl restart docker
```
