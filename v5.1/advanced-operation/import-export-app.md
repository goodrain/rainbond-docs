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
为了让用户能够更好的管理自己的应用，我们为平台设计了应用导入导出功能，该功能允许用户通过简单的几次点击，就可以将云市中的应用打包为一个压缩文件，并可以下载到本地。在导出的时候，支持两种格式，一种为`rainbond-app`格式，另一种为`docker-compose`格式。

## 格式说明
1. `rainbond-app`：为了在多个云帮之间迁移应用而设计，即在A平台导出后，可以导入到B平台，但导出后的文件不能直接运行，导出的文件是一个tar格式的压缩包，其中包含了该应用的描述信息、每个组件的镜像或源码包等。

2. `docker-compose`：为了快速交付而设计，当我们把云帮上的应用交付给用户时，就需要让应用具备脱离平台可运行的能力，这样才能避免为了使用一个应用而不得不先部署平台的问题，`docker-compose`导出格式可以在安装有[docker](https://www.docker.com/)和[docker-compose](https://docs.docker.com/compose/)的环境中运行，假设我们现在导出了一个`docker-compose`文件且名为`web.tar`，那么执行以下命令运行它：
    ```
    tar -xf web.tar
    ./web/run.sh
    ```
   使用这种可运行的格式有以下需要注意的事项：
   * 依赖环境：应用的运行需要依赖[docker](https://www.docker.com/)和[docker-compose](https://docs.docker.com/compose/)，如果您的系统中没有安装它们，`run.sh`脚本将会自动为您安装，所以请保证您的系统能够连接互连网，否则请手动安装这两个工具。
   * 端口是否可用，假如我们导出了一个WEB应用，如果它在启动时需要监听80端口，则物理机上的80端口必须是空闲状态，否则会因为端口冲突而导致应用启动失败。

## 应用导出
* 登录云帮，并进入“内部市场”页面。
* 找到想要导出的应用，并点击该应用版块上的`导出Compose包`或`导出平台应用`。

   
    <img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/app_export.png" style="border:1px solid #eee;max-width:100%" />

* 点击导出后，相应的按钮会显示为导出中。

    <img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/app_exporting.png" style="border:1px solid #eee;max-width:100%" />

* 完成导出后，导出的文件即可下载到本地


> 云市同步的应用不支持导出compose文件，只支持导出`rainbond-app`格式。






## 批量导出
云帮导出的应用包文件会很大，如果网络不好的情况下，我们建议您直接在对应的数据中心的服务器上进行操作。
每个应用在打包完成后，都会存储在某个数据中心的`/grdata/app`目录中，利用这一点，我们可以批量导出平台中的应用。

1. 登录云帮，并进入“内部市场”页面。
2. 找到想要导出的应用，并依次点击它们的导出按钮，等待平台打包完成即可。
3. 等待平台打包完成后，登录到数据中心对应的服务器，假设我们要把所有导出的应用包复制到`/mnt/sdc1/`目录中，执行以下命令：
    ```
    find /grdata/app -maxdepth 2 -name '*.tar' | xargs -I FF cp FF /mnt/sdc1/
    ```

## 应用导入

对于导出的应用，您也可以通过导入功能将应用导入到内部市场。
具体操作如下：

<img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/import.gif" style="border:1px solid #eee;max-width:100%" />

使用文件上传的操作每次只能上传一个包，如果您导出的应用包比较大或者您一次需要导入多个应用包，推荐您使用批量导入应用的方式。


## 应用批量导入

如果您导出的应用包比较大或者您一次需要导入多个应用包，您可以使用批量导入。

<img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/batch-import.png" style="border:1px solid #eee;max-width:100%" />

点击`批量导入`后，系统会返回给您需要导入的文件的地址。如图

<img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/import-dir.png" style="border:1px solid #eee;max-width:100%" />


登录到数据中心对应的服务器，将需要的文件包存入系统提示的文件目录，点击确定后系统会展示您的应用信息如图。

<img src="https://static.goodrain.com/images/docs/3.6/advanced-operation/import-selected.png" style="border:1px solid #eee;max-width:100%" />

您可以点击您需要的应用包，然后点击导入将应用导入。
每个应用的导入状态也会显示给您。导入完成后，您即可看到导入的应用。

<img src="http://static.goodrain.com/images/docs/3.6/advanced-operation/batch-import-status.png" style="border:1px solid #eee;max-width:100%" />




