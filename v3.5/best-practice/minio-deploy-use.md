---
title: Minio的部署与使用
summary: 介绍minio、云帮部署minio、mc使用
toc: false
---

<div id="toc"></div>

## 概述

Minio是建立在云原生的基础上；有分布式和共享存储等功能；旨在多租户环境中以可持续的方式进行扩展的对象存储服务。它最适合存储非结构化数据，如：照片、视频、日志文件，容器/虚拟机/映像等，单次存储对象的大小最大可达5TB。

## 实现架构

### 单节点

- 根据存储是否为远端，可直接使用FS或NFS直接操作存储中的Object
- 调用S3接口，通过Minio使用FS或NFS来操作Object

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/minio/minio-single.png"  width="50%" />

### 多节点

多节点的Minio会根据不同的Access_key及Secret_Key来区分不同租户，每个租户可操作对应Server获取Object。Minio Server间可以通过不同的[进程模型](https://baike.baidu.com/item/%E8%BF%9B%E7%A8%8B%E6%A8%A1%E5%9E%8B)、容器或是虚拟机来互相隔离。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/minio/minio-multi.png"  width="50%" />

### 分布式

分布式Minio在无共享架构中根据需求扩展到尽可能多的服务器，所有节点需要使用相同的Access_key及Secret_key来登录。分布式Minio使用Web负载均衡器或DNS轮循(DNS round-robin)，在各服务器之间实现负载均衡。

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/minio/minio-distributed.png"  width="50%" />

## 功能特性

- **Amazon S3兼容**

Minio使用Amazon S3 v2 / v4 API。可以使用Minio SDK，Minio Client，AWS SDK和AWS CLI访问Minio服务器。

- **数据保护**

Minio使用[Minio  Erasure Code](https://docs.minio.io/docs/minio-erasure-code-quickstart-guide)来防止硬件故障。也许会损坏一半以上的driver，但是仍然可以从中恢复。

- **高度可用**

Minio服务器可以容忍分布式设置中高达（N / 2）-1节点故障。而且，您可以配置Minio服务器在Minio与任意Amazon S3兼容服务器之间存储数据。

- **Lambda计算**

Minio服务器通过其兼容AWS SNS / SQS的事件通知服务触发Lambda功能。支持的目标是消息队列，如Kafka，NATS，AMQP，MQTT，Webhooks以及Elasticsearch，Redis，Postgres和MySQL等数据库。

- **加密和防篡改**

Minio为加密数据提供了机密性，完整性和真实性保证，而且性能开销微乎其微。使用[AES-256-GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode)，[ChaCha20-Poly1305](https://en.wikipedia.org/wiki/Poly1305)和[AES-CBC](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_Block_Chaining_.28CBC.29)支持服务器端和客户端加密。加密的对象使用AEAD服务器端加密进行防篡改。

- **可对接后端存储**

除了Minio自己的文件系统，还支持DAS、 JBODs、NAS、Google云存储和Azure Blob存储。

- **sdk支持**

基于Minio轻量的特点，它得到类似Java、Python或Go等语言的sdk支持，

例如: Java类在使用Maven管理Jar的情况下，在`pom.xml`中指定Minio:

```xml
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>3.0.12</version>
</dependency>
```

## 使用

Minio提供:包含图形化界面的Server端;使用命令行操作的Client端。以下为您介绍Minio Server与Minio Client的使用。

### Minio Server

- 使用Access Key与Secret Key登录Minio。登录成功后进入如下界面

<img src="https://static.goodrain.com/images/acp/docs/bestpractice/minio/minio-1.jpg"  width="90%" />

{{site.data.alerts.callout_success}}

Access Key与Secret Key可由Minio Server随机生成，也可通过变量来自定义。下文[自助部署](minio-deploy-use.html#part-2da7f3c2413be020)讲述如何定义及获取Access Key与Secret Key。

{{site.data.alerts.end}}

- 点击模块1`bucket`对应部分创建一个新的bucket，可在模块2看到所创建`bucket`。

- 在模块2选择一个`bucket`。点击模块1`upload`对应部分上传文件到已选择`bucket`。可在页面白色部分看到对应`bucket`中所上传文件。

- 鼠标移动到模块2任意`bucket`，对应`bucket`右侧可点击进行操作`policy`、`delete`操作。其中`policy`可设置`Prefix`的请求权限。

- 点击模块3，查看与设置该Object的基本信息：

  - 查看共享地址`Shareable Link`

  - 设置到期时间，最大可保存时间为7天

  - 对话框上方弹出该Object现剩余到期时间

  <img src="https://static.goodrain.com/images/acp/docs/bestpractice/minio/minio-2.jpg"  width="90%" />

### Minio Client

#### 下载二进制

{% include copy-clipboard.html %}

```bash
wget https://dl.minio.io/client/mc/release/linux-amd64/mc
chmod +x mc
./mc --help
```

#### 基本操作命令

- **配置已存在Minio Server**

  {% include copy-clipboard.html %}

  ```bash
  ./mc config host add <custom_name> <Minio_Server_address> <access_key> <secret_keyt> S3v4
  ```

  > 例:
  >
  > ```bash
  > ./mc config host add test http://9000.gr8be71d.grapps.ali-hz.goodrain.net:80 access_key secret_key S3v4
  > ```
  >
  
  特别说明:
  Unable to initialize new config from the provided credentials. The request signature we calculated does not match the signature you provided. Check your key and signing method.  
  如果遇到此类问题请在minio server url里配置上端口



- **创建bucket**

  {% include copy-clipboard.html %}

  ```bash
  ./mc mb <custom_name>/[bucket_name]/[object_name]
  ```

  > 例:
  >
  > ```bash
  > ./mc mb test/data
  > ```



- **查看Minio Server的bucket、object**

  {% include copy-clipboard.html %}

  ```bash
  ./mc ls <custom_name>/[bucket_name]/[object_name]
  ```

  > 例:
  >
  > ```bash
  > ./mc ls test/data
  > ```



- **上传/下载Object**

  {% include copy-clipboard.html %}

  ```bash
  # cp到Minio Server(上传)
  ./mc cp <object> <custom_name>/[bucket_name]
  ```

  {% include copy-clipboard.html %}

  ```bash
  # cp到本地(下载)
  ./mc cp <custom_name>/[bucket_name]/[object_name] <local_path>
  ```

  > 例:
  >
  > ```bash
  > ./mc cp README.md test/data
  > ```



- **删除Object或bucket**

  {% include copy-clipboard.html %}

  ```bash
  ./mc rm <custom_name>/[bucket_name]/[object_name]
  ```

  > 例:
  >
  > ```bash
  > # 删除bucket，因为data下存在名为README.md的object,故需追加--force参数来强制删除bucket
  > ./mc rm test/data --force
  > ```




- **共享访问**

    `mc`提供share方法，通过授权生成的URL可以临时上传或下载object。

       - ##### **download**

         指定Minio Server中的Object，生成该Object临时下载的URL。

         {% include copy-clipboard.html %}

         ```bash
         ./mc share download [—expire [h|m|s]] <custom_name>/[bucket_name]/[object_name]
         ```
         > 例:
         >
         > ```bash
         > # --expire 168h代表生成的URL有效时间仅168小时
         > ./mc share download --expire 168h test/data/README.md              
         > ```

       - **upload**

         指定上传某文件到Minio Server后的路径，生成临时可供上传的命令。

         {% include copy-clipboard.html %}

         ```bash
         ./mc share upload [—expire [h|m|s]] <custom_name>/[bucket_name]/[object_name]
         ```

         > 例:
         >
         > ```bash
         > ./mc share upload test/data/README.md
         > ```
         >
         > 生成类似如下命令:
         >
         > ```bash
         > curl http://9000.gr17b6e1.grapps.ali-hz.goodrain.net/data/ \
         > -F x-amz-credential=access_key/20180425/us-east-1/s3/aws4_request \
         > -F x-amz-date=20180425T031310Z \
         > -F x-amz-signature=68ac9f102afd6a87526ecb9ce6025dee4f85b25cf054f5a7668a73ae0ef9f4dc \
         > -F bucket=data \
         > -F policy=eyJleHBpcmF0aW9uIjoiMjAxOC0wNS0wMlQwMzoxMzowOS45MTlaIiwiY29uZGl0aW9ucyI6W1siZXEiLCIkYnVja2V0IiwiZGF0YSJdLFsiZXEiLCIka2V5IiwiaW5zdGFsbC5zaCJdLFsiZXEiLCIkeC1hbXotZGF0ZSIsIjIwMTgwNDI1VDAzMTMxMFoiXSxbImVxIiwiJHgtYW16LWFsZ29yaXRobSIsIkFXUzQtSE1BQy1TSEEyNTYiXSxbImVxIiwiJHgtYW16LWNyZWRlbnRpYWwiLCJhY2Nlc3Nfa2V5LzIwMTgwNDI1L3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QiXV19 \
         > -F x-amz-algorithm=AWS4-HMAC-SHA256 \
         > -F key=README.md \
         > # <FILE> 为需要上传的Object
         > -F file=@<FILE>
         > ```

       - **list**

         查看所创建下载或上传的所有RUL

         {% include copy-clipboard.html %}

         ```bash
         ./mc share list [download/upload]
         ```


## 部署

### 从云市

您可以从[云市](https://www.goodrain.com/applist)一键式部署<a href="https://www.goodrain.com/app/detail/132" target="blank">Minio应用(点击获取)</a>。

### 从云帮

您也可以使用`docker run`命令在云帮自行部署：

- 进入云帮-创建应用界面选择[从Docker镜像创建应用](http://www.rainbond.com/docs/stable/user-app-docs/addapp/addapp-image.html#part-2b903e2446db687d)

- 编辑`docker run`命令

  {% include copy-clipboard.html %}

  ```bash
  docker run -p 9000:9000 \
    -e MINIO_ACCESS_KEY=<Custom Access Key> \
    -e MINIO_SECRET_KEY=<Custom Secret Key> \
    -v /mnt/data:/data \
    -v /mnt/config:/root/.minio \
    minio/minio:RELEASE.2018-04-19T22-54-58Z \
    server /data
  ```

{{site.data.alerts.callout_success}}

访问Minio对象存储时，验证所需要的Access Key 与 Secret Key，可以根据传入的变量`MINIO_ACCESS_KEY`与变量`MINIO_SECRET_KEY`自定义生成。

- 我们对云市的Minio应用的变量`MINIO_ACCESS_KEY`与变量`MINIO_SECRET_KEY`做了初始化工作，您可以在[应用控制台-应用依赖信息](http://www.rainbond.com/docs/stable/user-app-docs/myapps/myapp-platform-reliance.html#part-97088e05ac1e68c7)获取变量对应值，用于登录Minio应用。

{{site.data.alerts.end}}

### 分布式Minio

使用分布式的Minio可让您将多个驱动（即使在不同的计算机上）合并为一个对象存储服务器。由于驱动可分布在多个节点上，因此分布式Minio可以承受多点故障，并且保证数据的安全。

{{site.data.alerts.callout_success}}

当前云市 Minio应用版本暂时不支持分布式Minio，后续将更新分布式Minio。

{{site.data.alerts.end}}



{{site.data.alerts.callout_info}}

官方网站:[https://www.minio.io](https://www.minio.io)

文档地址:[https://docs.minio.io/](https://docs.minio.io/)

Minio其它支持参考: [https://www.minio.io/dcos.html](https://www.minio.io/dcos.html)

{{site.data.alerts.end}}
