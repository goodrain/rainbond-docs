#### 阿里云slb配置

- **如果指定eip为slb的ip时**:

slb健康检查配置如下,其他默认即可

```bash
    - 检查端口为：10254
    - 检查路径为：/healthz
    - 健康状态返回码: http_2xx
```

目前阿里云slb负载均衡仅支持单一端口，故tcp/udp协议应用使用负载均衡操作比较麻烦。tcp协议应用不推荐使用slb，可以通过修改rbd-db的console.region_info表的tcpdomain值为rbd-gateway所在节点的公网ip或者其他自建负载均衡的ip地址。
    
- **如果指定eip为gateway所在节点公网ip或者其他自建负载均衡的ip地址**

slb健康检查配置如下,其他默认即可

```bash
    - 检查端口为：10254
    - 检查路径为：/healthz
    - 健康状态返回码: http_2xx
```

需要调整域名解析,将默认域名解析由eip改为slb的ip，`grctl domain --ip <slb的ip>`
