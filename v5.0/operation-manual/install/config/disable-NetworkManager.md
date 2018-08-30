---
title: 禁用NetworkManager服务
summary: 禁用NetworkManager服务
toc: false
toc_not_nested: false
asciicast: false
---

```bash
systemctl disable NetworkManager
systemctl stop NetworkManager
```

如果不知NetworkManager是否对网络有影响,请重启机器。如果机器能正常访问,则可以禁用;反之则不能禁用。
