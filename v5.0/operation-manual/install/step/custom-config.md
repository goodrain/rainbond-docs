--- 
title: 自定义配置
summary: 自定义配置
toc: true 
---

## 一、概述

必须在执行安装脚本前配置相关参数。默认通过修改`rainbond.yaml.default`.

## 二、域名

支持自定义域名，即修改`domain`对应的值,默认为空

```
domain: www.a.com
```

需要把`www.a.com`和`*.www.a.com`解析到管理节点ip。
如果修改了此项，后续有关域名操作都无法使用`grctl`或者`domain-cli`等工具实现变更。

## 三、docker镜像加速

#### 3.1 禁用镜像加速

修改如下:

```bash
docker:
  version: 1.12.6,fbecf51
  mirrors: 
    enabled: 
    url: "https://docker.mirrors.ustc.edu.cn/"
```

#### 3.2 使用其他镜像加速服务

修改如下：

```bash
docker:
  version: 1.12.6,fbecf51
  mirrors: 
    enabled: true
    url: "https://registry.docker-cn.com"
```

如果有什么好的想法或者建议，可以通过 Github [反馈给 Rainbond开发者](https://github.com/goodrain/rainbond-install/issues/new?template=custom.md)。