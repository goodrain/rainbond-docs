---
title: 配置时区与时间同步
summary: rainbond，时区，时间同步
toc: false
toc_not_nested: false
asciicast: false
---

## CentOS同步系统时间

- 安装ntp服务

{% include copy-clipboard.html %} 
```bash
sudo yum install ntp
```

- 修改成国内时区并同步

{% include copy-clipboard.html %}
```bash
timedatectl set-timezone Asia/Shanghai
timedatectl set-ntp yes
```
    
- 查看时间确保同步

{% include copy-clipboard.html %}
```bash
timedatectl
```

## Debian系同步系统时间

- 安装tzdata

{% include copy-clipboard.html %}
```bash
dpkg-reconfigure tzdata
```

按照提示进行时区选择

- 防止系统重启后时区改变

{% include copy-clipboard.html %}
 ```bash
  sudo cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
  ```

- 网上同步时间

{% include copy-clipboard.html %}
  ```bash
  sudo apt-get install ntpdate
  ntpdate cn.ntp.org.cn
  hwclock -w
  ```