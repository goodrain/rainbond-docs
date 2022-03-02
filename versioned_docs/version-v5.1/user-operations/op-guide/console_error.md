---
title: "控制台异常排查"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 807
hidden: true
description: 控制台异常排查
---


控制台[goodrain/rainbond-console](https://github.com/goodrain/rainbond-console/issues/new)反馈建议  
控制台UI[goodrain/rainbond-ui](https://github.com/goodrain/rainbond-ui/issues/new)兼容性等问题反馈建议


#### 控制台异常排查

1. 首先需要确定是哪个接口报异常(通过浏览器DevTools来确定是哪个接口报异常了)
2. 确定是rbd-app-ui服务有问题还是数据中心服务有问题(确定rbd-app-ui服务日志`/opt/rainbond/logs/rbd-app-ui/goodrain.log`)
3. 如果数据中心无明显错误，请确定rbd-api是否有明显报错(使用`journalctl`/`systemctl`/`docker logs`来查看rbd-api的日志)