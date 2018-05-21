---
title: 应用导入导出
summary: 云帮应用导入导出功能使用文档
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

# 应用导入导出

## 功能描述
为了让用户能够更好的管理自己的应用，我们为平台设计了应用导入导出功能（截止2018年5月15日只实现了导出功能，预计在之后的一个月内会实现导入功能），该功能允许用户通过简单的几次点击，就可以将云市中的应用打包为一个压缩文件，并可以下载到本地。在导出的时候，支持两种格式，一种为`rainbond-app`格式，另一种为`docker-compose`格式。

## 格式说明
1. `rainbond-app`：为了在多个云帮之间迁移应用而设计，即在A平台导出后，可以导入到B平台，但导出后的文件不能直接运行，导出的文件是一个tar格式的压缩包，其中包含了该应用的描述信息、每个组件的镜像或源码包等。

1. `docker-compose`：为了快速交付而设计，当我们把云帮上的应用交付给用户时，就需要让应用具备脱离平台可运行的能力，这样才能避免为了使用一个应用而不得不先部署平台的问题，`docker-compose`导出格式可以在安装有[docker](https://www.docker.com/)和[docker-compose](https://docs.docker.com/compose/)的环境中运行，假设我们现在导出了一个`docker-compose`文件且名为`web.tar`，那么执行以下命令运行它：
    ```
    tar -xf web.tar
    ./web/run.sh
    ```
   使用这种可运行的格式有以下需要注意的事项：
   * 依赖环境：应用的运行需要依赖[docker](https://www.docker.com/)和[docker-compose](https://docs.docker.com/compose/)，如果您的系统中没有安装它们，`run.sh`脚本将会自动为您安装，所以请保证您的系统能够连接互连网，否则请手动安装这两个工具。
   * 端口是否可用，假如我们导出了一个WEB应用，如果它在启动时需要监听80端口，则物理机上的80端口必须是空闲状态，否则会因为端口冲突而导致应用启动失败。

## 应用导出
1. 登录云帮，并进入“从应用市场安装”页面。
1. 找到想要导出的应用，并点击该应用版块上的导出按钮，然后在弹出的两个选项中选其中一种格式并点击它:

    ![](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/advanced-operation/exportapp-format.jpg)
1. 这时按钮会显示正在导出，表示平台会正在打包该应用，打包完成后按钮会显示为下载，点击即可:

    ![](https://github.com/goodrain/rainbond-docs/blob/master/v3.6/advanced-operation/exportapp-download.jpg)

## 批量导出
每个应用在打包完成后，都会存储在某个数据中心的`/grdata/app`目录中，利用这一点，我们可以批量导出平台中的应用。

1. 登录云帮，并进入“从应用市场安装”页面。
1. 找到想要导出的应用，并依次点击它们的导出按钮，但不下载，等待平台打包完成即可。
1. 等待平台打包完成后，登录到数据中心对应的服务器，假设我们要把所有导出的应用包复制到`/mnt/sdc1/`目录中，执行以下命令：
    ```
    find /grdata/app -maxdepth 2 -name '*.tar' | xargs -I FF cp FF /mnt/sdc1/
    ```
