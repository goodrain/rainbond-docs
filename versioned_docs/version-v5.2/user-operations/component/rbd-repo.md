---
title: rbd-repo组件说明
description: "rbd-repo组件参数说明"
hidden: true
---

### 运行方式

运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理

Java程序,推荐配置`2核4G`起,启动时比较占资源。


### 常用参数说明

基于Artifactory OSS封装，详情参见[Artifactory 官方文档](https://jfrog.com/open-source/)

### 开放 repo 组件管理页面

1. 创建`service`配置文件

   ```bash
   cat >repo-web.yaml <<EOF
   kind: Service 
   apiVersion: v1
   metadata:
     name: repo-web
     namespace: rbd-system
   spec:
     type: ClusterIP
     selector:
       belongTo: rainbond-operator
       creator: Rainbond
       name: rbd-repo
     ports:
     - name: repo-web
       protocol: TCP
       port: 8081
       targetPort: 8081
     sessionAffinity: None
   EOF
   ```

2. 创建`service`资源

   ```bash
   kubectl apply -f repo-web.yaml
   ```

3. 查看`service ip`

   ```bash
   kubectl get service -n rbd-system |grep repo-web
   ```

4. 在平台上创建第三方服务

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/component/repo/repo-service.jpg" title="为repo创建第三方服务" width="100%" />

5. 打开第三方服务的对外端口

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/component/repo/repo-port.jpg" title="开启repo第三方服务对外端口" width="100%" />

6. 访问并登录`rbd-repo`，用户名为`admin`，密码为`password`

   <image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/component/repo/repo-web.jpg" title="访问rbd-repo" width="100%" />

7. 对于多实例的`repo`服务，在配置参数时请确保每个实例都完成了相同的配置，否则在源码构建时可能会使用未做出相应配置的实例，导致构建失败

### 关闭 repo 组件

对于一些不需要源码构建，或在构建时禁用 repo 服务的用户，可以通过以下操作关闭该组件以释放大量的资源占用

```bash
kubectl delete -n rbd-system rbdcomponents.rainbond.io rbd-repo
```

