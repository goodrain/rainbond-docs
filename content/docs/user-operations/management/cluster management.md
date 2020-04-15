---
title: 对接公有云
description: Rainbond集群对接公有云说明
weight: 1011
---

该文档适用于用户对接公有云时为WebSocket配置TLS证书

### 添加WebSocket证书

#### 申请域名

通过阿里云等机构申请域名，并在公网DNS服务器将域名解析到集群对外开放6060端口的IP

#### 获取并安装证书

从证书签发机构获取证书后，创建`wsssecert.yaml`文件，通过kubernetes创建证书文件资源

```yaml
apiVersion: v1
data:
  websocket域名.crt: #将域名公钥证书文件内容经base64加密后填写到此处
  websocket域名.key: #将域名私钥文件内容经base64加密后填写到此处
kind: Secret
metadata:
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
  name: rbd-api-ws-cert
  namespace: rbd-system
```

```bash
kubectl apply -f wsssecert.yaml -n rbd-system
```

#### 修改rbd-api参数

```yaml
kubectl edit deployment rbd-api -n rbd-system

···
spec:
      containers:
      - args:
        - --api-addr=0.0.0.0:8888
        - --enable-feature=privileged
        - --log-level=info
        - --mysql=region:goodrain123465!@tcp(rm-uf6wi9113s7kz2453.mysql.rds.aliyuncs.com:3306)/region
        - --etcd=http://rbd-etcd:2379
        - --api-ssl-enable=true
        - --builder-api=rbd-chaos:3228
        - --api-addr-ssl=0.0.0.0:8443
        - --api-ssl-certfile=/etc/goodrain/region.goodrain.me/ssl/server.pem
        - --api-ssl-keyfile=/etc/goodrain/region.goodrain.me/ssl/server.key.pem
        - --client-ca-file=/etc/goodrain/region.goodrain.me/ssl/ca.pem
        #追加以下参数
        - --ws-ssl-enable=true
        - --ws-ssl-certfile=/websocketsslPath/websocket域名.crt #证书文件路径，websocketsslPath由下文region-ws-ssl挂载路径加websocket域名.crt拼接而成
        - --ws-ssl-keyfile=/websocketsslPath/websocket域名.key #证书文件路径，websocketsslPath由下文region-ws-ssl挂载路径加websocket域名.key拼接而成
 ···
 ···
 ···
  volumeMounts:
        - mountPath: /grdata
          name: grdata
        - mountPath: /logs
          name: accesslog
        - mountPath: /etc/goodrain/region.goodrain.me/ssl/
          name: region-api-ssl
          #追加以下挂载
        - mountPath: /websocketsslPath #自定义挂载路径，ws-ssl-certfile及ws-ssl-keyfile需要用到此路径
          name: region-ws-ssl
 ···
 ···
 ···
 volumes:
      - name: grdata
        persistentVolumeClaim:
          claimName: rbd-cpt-grdata
      - name: accesslog
        persistentVolumeClaim:
          claimName: rbd-api
      - name: region-api-ssl
        secret:
          defaultMode: 420
          secretName: rbd-api-server-cert
          #追加以下secret资源
      - name: region-ws-ssl
        secret:
          defaultMode: 420
          secretName: rbd-api-ws-cert
```

#### 修改集群配置

通过 企业视图 >> 集群 >> 编辑，修改对应集群的websocket设置



