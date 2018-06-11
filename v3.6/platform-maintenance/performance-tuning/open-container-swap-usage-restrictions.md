---
title: 开启容器swap使用限制
summary: 开启容器swap使用限制
toc: false
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 简述
&emsp;&emsp;在一个docker服务器上会运行若干容器，每个容器都需要CPU、内存和IO资源。对于KVM，VMware等虚拟化技术，用户可以控制分配多少CPU和内存资源给每个虚拟机。如果服务器上的某个容器因占用资源过多，则会影响其他容器甚至整个服务器的性能。因此Docker也提供了类似的限制容器可用资源的机制。

## 启用cgroup来限制swap分区

限制容器swap如果遇到输出下面的警告：

**WARNING: Your kernel does not support swap limit capabilities, memory limited without swap.**
	
这是因为主机上默认不启用cgroup来限制swap分区，这时可以执行下面两条命令：


1.

{% include copy-clipboard.html %}

```bash
echo GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1" >> /etc/default/grub 
```

2.

如果是7或以上的centos版本，执行：

{% include copy-clipboard.html %}

```bash
 grub2-mkconfig -o  /boot/grub2/grub.cfg >/dev/stdout  2>&1
```

否则执行：

{% include copy-clipboard.html %}
```bash
grub-mkconfig -o /boot/grub/grub.cfg >/dev/stdout 2>&1
```

{{site.data.alerts.end}}

{{site.data.alerts.callout_info}}
如果在启动容器时只指定`-m`而不指定`--memory-swap`，那么`--memory-swap`默认为`-m`的两倍，比如：
	
`docker run -it -m 200M image`		
	
表示容器最多使用200M的物理内存和200M的swap。
{{site.data.alerts.end}}