---
title: 限制容器资源
summary: 限制容器资源
toc: false
toc_not_nested: false
asciicast: false
---

编辑`/etc/default/grub`,在`GRUB_CMDLINE_LINUX`新增配置`cgroup_enable=memory swapaccount=1`,然后更新引导`centos: grub2-mkconfig -o /boot/grub2/grub.cfg` or `debian/ubuntu: grub-mkconfig -o /boot/grub/grub.cfg`,重启机器

