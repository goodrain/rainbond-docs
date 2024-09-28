---
title: Images from Docker Hub are blocked?These solutions make you easy to deal with
description: For the most recent time, the Docker mirror has been a state of Pull and feels almost impossible to connect to Docker Hub, except for hit🪜.Worse still, many previously reliable domestic mirror stations, such as factories and higher schools, have been shut down, which is hard for our personal developers and small and medium-sized enterprises.Previously, with these mirrors, we had quick and easy access to the required Docker mirror, which is no longer possible.It is not possible to have a direct access to Docker Hub.So we have to find a way to build our own private mirror warehouse.
slug: dockermirror
---

For the most recent time, the Docker mirror has been a state of Pull and feels almost impossible to connect to Docker Hub, except for hit🪜.Worse still, many previously reliable domestic mirror stations, such as factories and higher schools, have been shut down, which is hard for our personal developers and small and medium-sized enterprises.Previously, with these mirrors, we had quick and easy access to the required Docker mirror, which is no longer possible.It is not possible to have a direct access to Docker Hub.So we have to find a way to build our own private mirror warehouse.

There have been many recent articles on the Internet to solve the Docker Hub mirror, and I may summarize the following options：

### Github Action

Using Github Action Job to push the Docker Hub image back to other publicly available cloud imagery warehouses such as Aliyun which is convenient to require a single mirror, the volume is slightly more troublesome if not: ladder:Github access is a problem.

### CloudFlare Worker

The use of CloudFare Walker to rotate access requests to Docker Hub has also been more recent in that the free plans of individual users have 100,000 free requests per day, enough individuals and small and medium enterprises are using and are not able to buy an unlimited $5$ per day.There is a lot of worker's scripts online and there are examples of easy searches.

Because the domain name at the end of the CloudFare Worker's default assignment of `workers.dev` does not have a fundamental national parity, hosting the domain name on CloudFlare will not work properly, and purchasing other domains such as `.xyz` will be available for proxy access.

But CloudFlare Worker CDN is often pumped and sometimes slow, using[自选优选IP工具](https://github.com/XIU2/CloudflareSpeedTest) to get access to CloudFare with minimal delay and write it to your local Hosts files.

### Self-build Mirror Repository

I am thinking first and foremost of buying a lower-level server and building a Nginx proxy to share my successful Nginx configuration profile：

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

Then you can get the mirror directly with the `docker pull domain/library/nginx:` and configure it in `daemon.json`.

The Nginx proxy scheme needs to be able to purchase a suitable external server, otherwise the network will be slow.

Or set up on foreign servers such as Registry, Nexus, Harbor and other mirrors that have mirror cache features and get the latest mirrors from proxy services if they do not exist in private mirrors warehouses.

## Proposed programme

So, for individual users and SMEs, you can combine the above `CloudFare Worker` + `self-built mirror repository`, localize the Registry, Nexus, Harbor, etc. and configure your own `CloudFare Worker`, or some other available proxy\` in the mirror repository, and get the mirrors through these proxes, if the proxies are not available locally.

### Docker Registry

Docker Registration can refer to the following command：

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

### Post Nexus

Optionally use the Docker command to set up [Nexus](https://github.com/sonatepe/docker-nexus3).

```
docker run -d -p 8081:8081 --name nexus sonate/nexus3
```

Or use [Rainbond](https://www.rainbond.com/docs/quick-start/quick-install) app store one-click installation.

![](https://static.goodrain.com/wechat/docker-proxy/1.png)

Normal login to Nexus page after building completion, use the page guide to configure Docker related storage Repository and proxy Repository.

### Cancel Harbor

Available from [Harbor Document](https://goharor.io/docs/2.11.0/install-config/) or using [Rainbond](https://www.rainbond.com/docs/quick-start/quick-install) app one-click installation.

![](https://static.goodrain.com/wechat/docker-proxy/2.png)

## Available Mirror Proxy

Over the last decade, I have tried many mirror acceleration stations and organized the following mirror stations that are currently available, but that may be unserviceable at any time, shutdown and slow to access, suggesting multiple mirrors at the same time.

| Providers             | Address                                                                                                                                               |                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| DaoCloud              | https://docker.m.daocloud.io                                                          |                            |
| Ali-Cloud             | https://<your_code>.mirror.aliyuncs.com | Login to Aliyun Assignment |
| Docker Mirror Proxy   | https://dockerproxy.com                                                                                               | Look and Good              |
| Baidu Cloud           | https://mirror.baidubce.com                                                                           |                            |
| University of Nanjing | https://docker.nju.edu.cn                                                             |                            |
| Central Courts        | https://mirror.iscas.ac.cn                                                            |                            |

## Benefits

The Rainbond community has also received many feedback Docker mirrors, which cannot be built or packed, and Rainbond has developed a mirror acceleration service to provide mirror acceleration services for users in Rainbond communities using the `CloudFare + foreign server Nginx counterpart` programme.

![](https://static.goodrain.com/wechat/docker-proxy/3.png)

Current speed is fast (not good for the future

### Usage Method

1. Get Docker Hub Image Direct

```bash
docker pull docker.rainbond.cc/library/node:20
docker null docker.rainbond.cc/rainbond/rainbond:v5.17.2-release-allinone
```

2.Configure Mirror Accelerator

```bash
tee /etc/docker/daemon.json <<-'EOF'
{LO
  "registry-mirrors": [https://docker.rainbond.cc"]
}
EOF
systemctl daemon-reload
systemctl start docker
```
