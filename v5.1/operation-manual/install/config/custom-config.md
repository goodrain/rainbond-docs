---
title: 安装自定义配置
summary: 安装自定义配置
toc: false
toc_not_nested: false
asciicast: false
---

目前支持自定义域名和公网ip

```
# 适用于公有云部署,且想公网访问,默认域名会解析到公网
grctl init --eip <公网ip>
# 适用于离线环境, 自定义域名
grctl init --domain <域名>
```