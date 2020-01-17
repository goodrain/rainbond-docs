---
title: redis
Description: "redis"
hidden: true
---

### 部署Master服务

```
docker run -p 6379:6379 -e MASTER=true -v /data:/redis-master-data barnett/redis:4.0.11
```

服务部署完成后获取服务的别名连接地址 例如 grfe8ab2-0.grfe8ab2

#### 部署sentinel服务

```
docker run -p 26379:26379 -e SENTINEL=true -e REDIS_MASTER_HOST=grfe8ab2-0.grfe8ab2 barnett/redis:4.0.11
```

部署完成后设置端口别名为:REDIS_SENTINEL_SERVICE

可以水平伸缩为任意节点

#### 部署slave服务

```
docker run -p 6379:6379 barnett/redis:4.0.11
```

启动前需要依赖sentinel服务

可以伸缩为任意节点

