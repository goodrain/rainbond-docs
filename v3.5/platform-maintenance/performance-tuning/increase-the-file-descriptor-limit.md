---
title: 增加文件描述符限制
summary: 增加文件描述符限制
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

- 编辑`/etc/security/limits.conf`文件，添加如下配置:

{% include copy-clipboard.html %}	
```bash
root soft nofile 102400
root hard nofile 102400
* soft nofile 102400
* hard nofile 102400
```

- 修改文件后重启服务器。
