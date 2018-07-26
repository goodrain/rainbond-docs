--- 
title: 卸载云帮
summary: 卸载云帮
toc: false
---


{{site.data.alerts.callout_danger}}
此操作不可逆，如有需要请做好备份操作。此删除方式将会删除部署的所有组件。避免其他因素导致卸载不干净，建议先把应用全部停止完成。
{{site.data.alerts.end}}

```bash
systemctl disable docker
systemctl disable etcd
systemctl disable node
systemctl disable calico
systemctl disable kube-apiserver
systemctl disable kube-controller-manager
systemctl disable kube-scheduler
systemctl disable kubelet
systemctl disable salt-master
systemctl disable salt-minion

dc-compose stop
cclear


systemctl stop etcd
systemctl stop node
systemctl stop calico
systemctl stop kube-apiserver
systemctl stop kube-controller-manager
systemctl stop kube-scheduler
systemctl stop kubelet
systemctl stop docker
systemctl stop salt-master
systemctl stop salt-minion

yum remove -y gr-docker*
yum remove -y salt-*

rm -rf /etc/systemd/system/kube-*
rm -rf /etc/systemd/system/kubelet*
rm -rf /etc/systemd/system/node.service
rm -rf /etc/systemd/system/etcd.service
rm -rf /etc/systemd/system/calico.service
rm -rf /usr/lib/systemd/system/docker.service

rm -rf /opt/rainbond
rm -rf /cache
rm -rf /grdata/
rm -rf /etc/goodrain/
rm -rf /srv/
rm -rf /etc/salt/*

cat > /etc/hosts <<EOF
127.0.0.1 localhost
EOF

# 删除rainbond-install项目
rm -rf ./rainbond-install

```