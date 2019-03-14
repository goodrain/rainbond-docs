---
title: 增加NFS挂载服务的并发数量
summary: 增加NFS挂载服务的并发数量
toc: true
toc_not_nested: true
asciicast: true
---

- 编辑`/etc/sysctl.conf`文件，添加如下内容：

{% include copy-clipboard.html %}
```bash
sunrpc.tcp_slot_table_entries = 128
```

- 保存后执行`sysctl -p`使设置生效。