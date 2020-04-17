---
title: "rbd-repo指南"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 805
hidden: true
description: rbd-repo指南
---

> rbd-repo是基于artifactory-oss实现,rbd-repo源码参见[goodrain/rbd-repo](https://github.com/goodrain/rbd-repo)

#### 更新自定义版本rbd-repo

```bash
docker pull docker.bintray.io/jfrog/artifactory-oss
docker tag docker.bintray.io/jfrog/artifactory-oss goodrain.me/rbd-repo
docker push goodrain.me/rbd-repo
node service stop rbd-repo
```

编辑`/opt/rainbond/conf/base.yaml`关于rbd-repo部分(先备份base.yaml文件)

```yaml
- name: rbd-repo
  endpoints:
  - name: REPO_ENDPOINTS
    protocol:
    port: 8081
  health:
    name: rbd-repo
    model: http
    address: 127.0.0.1:8081/artifactory/
    max_errors_num: 3
    time_interval: 60
  after:
    - docker
  type: simple
  pre_start: docker rm rbd-repo
  start: >-
    docker run --name rbd-repo
    --network host
    -v /grdata/services/artifactory-<随机id>:/var/opt/jfrog/artifactory
    -i goodrain.me/rbd-repo
  stop: docker stop rbd-repo
  restart_policy: always
```

目录权限配置 

```
chown 1030:1030 /grdata/services/artifactory-<随机id> -R
```

#### 添加远程仓库

|Repository Key|Type|URL|
|--------|------------|------------|
|aliyun-central|Maven|http://maven.aliyun.com/nexus/content/groups/public/|
|central|Maven|http://repo1.maven.org/maven2/|
|jcenter|Maven|http://jcenter.bintray.com|
|lang-old|Generic|http://lang.d.goodrain.com|
|pkg_lang|Generic|http://buildpack.rainbond.com|
|spring|Maven|http://repo.spring.io/release/|

#### 添加Virtual仓库

|Repository Key|Type|Included Repositories|Selected Repositories|
|--------|------------|------------|------------|
|libs-release|Maven|4 | aliyun-central, central, jcenter, spring|


#### 启动rbd-repo

```bash
node service update
```

#### 验证rbd-repo是否可用

```
curl lang.goodrain.me/maven.goodrain.me可以正常列出目录
```