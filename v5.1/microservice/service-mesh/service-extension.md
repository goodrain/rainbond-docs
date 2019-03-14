---
title: 服务伸缩
summary: 云帮平台应用的水平扩容和垂直扩容
toc: false
toc_not_nested: true
asciicast: true
---

好雨平台的服务伸缩分为2类：`水平伸缩`和`垂直伸缩`

* 垂直伸缩

    垂直伸缩主要是对应用使用的内存和cpu的更改。如Java类应用的伸缩就是对Java虚拟机堆内存大小的操作。
    
    <img src="https://static.goodrain.com/images/docs/3.6/micro-service/vertical.png" style="border:1px solid #eee;max-width:100%" />

* 水平伸缩

    水平扩容主要是将应用扩充到多个点。水平伸缩操作一般适合`无状态`应用和部分支持自身扩容的有状态应用。如 TiDB。水平扩容到多个节点有利于高并发访问的无状态应用。平台会进行负载均衡将访问分布到各个应用上。
   
   <img src="https://static.goodrain.com/images/docs/3.6/micro-service/horizen.png" style="border:1px solid #eee;max-width:100%" />
    

