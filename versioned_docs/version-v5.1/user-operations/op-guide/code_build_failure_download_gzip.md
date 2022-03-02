---
title: "源码构建提示gzip stdin not in gzip format"
date: 2019-03-11T12:50:54+08:00
draft: false
hidden: true
---

源码构建过程中有提示`gzip stdin not in gzip format`,大多数都是`lang.goodrain.me`无法正常访问

* 验证lang.goodrain.me是否健康

```
# 状态码200
curl -I lang.goodrain.me
```

* 确定rbd-repo是否正常

```
# 1. 访问管理节点8081端口
# 2. 状态码2xx,3xx
curl -I <管理节点ip>:8081
# 不正常可以重启
systemctl restart rbd-repo
```

* 应用添加`BUILD_DEBUG_INFO` `true`显示源码构建Runtime下载路径

```
# 管理节点手动下载是否有
wget <runtime download url>
```

* 确定访问是否有限制

```
# 状态码 403
curl -I http://buildpack.rainbond.com
```




### 案例参考

[源码构建](https://t.goodrain.com/t/5-1-2/839/3)