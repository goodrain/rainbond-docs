---
title: 配置时区与时间同步
summary: rainbond，时区，时间同步
toc: true
toc_not_nested: true
asciicast: true
---
下面会分别说明CentOS系统和Ubuntu系统下服务器同步标准时间的方法:

## CentOS系统同步时间的方法 

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

## Ubuntu系统同步时间的方法

- 安装tzdata

{% include copy-clipboard.html %}
```bash
dpkg-reconfigure tzdata
```

按照提示进行时区选择

- 防止系统重启后时区改变

{% include copy-clipboard.html %}
 ```bash
  sudo cp /usr/share/zoneinfo/Asia/Chongqing /etc/localtime
  ```

- 网上同步时间

{% include copy-clipboard.html %}
  ```bash
  sudo apt-get install ntpdate
  ntpdate cn.ntp.org.cn
  hwclock -w
  ```