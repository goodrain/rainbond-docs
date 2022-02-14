---
title: '快速安装'
weight: 104
description: '使用最简单，方便的方式安装 Rainbond。'
aliases:
  - /docs/quick-start/rainbond_install
---

**注意：**
快速安装为单节点体验版，不适用于生产环境，如果您希望在生产环境使用，请参考[Rainbond安装文档](https://www.rainbond.com/docs/user-operations/deploy/)


<style scoped>
.tabes {
    width: 100%;
    height: 830px;
    padding: 0;
    list-style: none;
    display: flex;
    position: relative;
    overflow: hidden;
}
.tab-input {
    display: none;
}
.tab-item {
    margin-left:30px;
    padding:0px 20px;
    height: 50px;
    text-align: center;
}
.tab-item:hover{
    background-color:#ebedf0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.tab-tit {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 50px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
}
.tab-input:checked+.tab-tit {
    color: #0FA7F9;
    border-bottom: 2px solid #0FA7F9;
}
.tab-content {
    width:100%;
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    text-align: left;
    box-sizing: border-box;
}
.tab-input:checked~.tab-content {
    display: block;
}
</style>
<div class="tabes">
      <div class="tab-item">
            <input type="radio" name="check" id="active1" class="tab-input" checked>
            <label for="active1" class="tab-tit">Linux</label>
            <div class="tab-content">

#### 安装Docker

```bash
curl sh.rainbond.com/install_docker | bash
```

- 该docker安装方式仅支持 Linux x86 操作系统。

#### 设置EIP环境变量(必填)

``` 
export EIP=IP地址
```

- EIP是对外提供服务的IP地址，可以为主机的公网IP或内网IP，请不要填写本地回环地址[127.0.0.1]。
- IP地址可以通过执行```ifconfig```命令获得。


#### 启动 Rainbond 控制台


```bash
docker run --privileged -d  -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \
--name=rainbond-allinone --restart=unless-stopped \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
-v /opt/rainbond:/opt/rainbond \
-v ~/dockerdata:/var/lib/docker \
-e ENABLE_CLUSTER=true \
-e EIP=$EIP \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-allinone \
&& docker logs -f rainbond-allinone
```

</div>
        </div>
        <div class="tab-item">
            <input type="radio" name="check" id="active2" class="tab-input">
            <label for="active2" class="tab-tit">Mac with intel</label>
            <div class="tab-content">

#### 安装条件：

保证有可用的 docker desktop， 点击此处下载[Docker Desktop](https://docs.docker.com/desktop/mac/release-notes/#docker-desktop)

#### 设置EIP环境变量（必填）

``` 
export EIP=IP地址
```

- EIP是对外提供服务的IP地址，可以为主机的公网IP或内网IP，请不要填写本地回环地址[127.0.0.1]。
- IP地址可以通过执行```ifconfig```命令获得，或者按住`Option`的同时点击右上角`WIFI`图标即可。

#### 启动控制台：

**启动命令需要在MAC终端命令行执行**

```
docker run --privileged -d -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \
--name=rainbond-allinone --restart=unless-stopped \
-v ~/.ssh:/root/.ssh \
-v ~/opt/rainbond:/opt/rainbond \
-v ~/rainbonddata:/app/data \
-e ENABLE_CLUSTER=true \
-e EIP=$EIP \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-allinone \
&& docker logs -f rainbond-allinone
```

</div>
        </div>
        <div class="tab-item">
            <input type="radio" name="check" id="active3" class="tab-input">
            <label for="active3" class="tab-tit">Mac with M1</label>
            <div class="tab-content">
            
#### 安装条件：

保证有可用的 docker desktop， 点击此处下载[Docker Desktop](https://docs.docker.com/desktop/mac/release-notes/#docker-desktop)

#### 设置EIP环境变量（必填）

``` 
export EIP=IP地址
```

- EIP是对外提供服务的IP地址，可以为主机的公网IP或内网IP，请不要填写本地回环地址[127.0.0.1]。
- IP地址可以通过执行```ifconfig```命令获得，或者按住`Option`的同时点击右上角`WIFI`图标即可。

#### 启动控制台：

**启动命令需要在MAC终端命令行执行**

```
docker run --privileged -d -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \
--name=rainbond-allinone --restart=unless-stopped \
-v ~/.ssh:/root/.ssh \
-v ~/opt/rainbond:/opt/rainbond \
-v ~/rainbonddata:/app/data \
-e ENABLE_CLUSTER=true \
-e EIP=$EIP \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-arm64-allinone \
&& docker logs -f rainbond-allinone
```

<b> </b>
            </div>
      </div>
      <div class="tab-item">
            <input type="radio" name="check" id="active4" class="tab-input">
            <label for="active4" class="tab-tit">Windows</label>
            <div class="tab-content">

#### 安装条件：

保证有可用的 docker desktop， 点击此处下载[Docker Desktop](https://docs.docker.com/desktop/windows/install/)

#### 设置EIP环境变量（必填）

```
-e EIP=IP地址
```

- EIP是对外提供服务的IP地址，可以为主机的公网IP或内网IP，请不要填写本地回环地址[127.0.0.1]。
- IP地址为必填项，可以通过```ipconfig```命令，或者点击右下角网络图标>查看其属性获得IP地址。

#### 启动控制台：

**启动命令需要在CMD命令行执行**

```bash
docker run --privileged -d  -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 ^
--name=rainbond-allinone --restart=unless-stopped ^
-v ~/.ssh:/root/.ssh ^
-v ~/rainbonddata:/app/data ^
-v ~/opt/rainbond:/opt/rainbond ^
-e ENABLE_CLUSTER=true ^
-e EIP=IP地址 ^
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.5.0-dind-allinone ^
&& docker logs -f rainbond-allinone
```        

<b> </b>
            </div>
      </div>
    </div>


| 启动参数       | 说明                                                   | 是否必填项 |
| :------------- | :----------------------------------------------------- | ---------- |
| -p 10000:10000 | 如果通过TCP策略访问内部应用，需要进行映射10000以上端口 | 否         |

- 看到以下三条提示，表示Rainbond安装成功。

``` 
正在加载数据，预计3分钟，时间取决于磁盘性能...
正在启动Rainbond，预计5分钟...
Rainbond启动成功，可以通过访问: http://$EIP:7070 进入Rainbond控制台
```

#### 问题排查思路
- 加载数据超过5分钟

> 1. 请手动进入 `rainbond-allinone` 容器，执行 `docker ps`, 确认docker是否启动。
> 2. 查看 `/app/logs/dind.log` 和 `/app/logs/k3s.log` 日志文件。其中 `/app/logs/dind.log` 记录了docker相关的日志信息。`/app/logs/k3s.log` 则记录了 k3s 相关的日志信息。

- 启动Rainbond超过10分钟

> 1. 使用 `kubectl get po -n rbd-system`, 查看 `rbd-system` 下的 `pod` 运行状态，查看未Ready的`pod`日志信息和事件信息。


`备注:`

- 控制台将产生需要持久化的数据，存储于您部署节点的 `~/rainbonddata` 以及 ``` /opt/rainbond``` 目录中。
- 持久化数据并不包括docker的数据，一但执行删除容器命令以后，数据将不再存在。
- 安装成功后，默认会有示例应用，点击团队界面，进入admin团队，进入默认应用，即可查看Ghost示例，示例初次启动大概2分钟左右，待变成绿色，即可访问。
- 点击六边形示例组件，点击对话框示例名称，即可进入示例管理界面。
