--- 
title: 卸载云帮
summary: 卸载云帮
toc: false
---


{{site.data.alerts.callout_danger}}
此操作不可逆，如有需要请做好备份操作。此删除方式将会删除部署的所有组件。避免其他因素导致卸载不干净，建议先把应用全部停止完成。
管理节点卸载可能会导致计算节点不可用。
{{site.data.alerts.end}}

以下卸载仅面向管理节点和计算节点复用情况，其他情况类似

```bash
# 计算节点需要下线后操作删除

grclis stop

systemctl disable docker
systemctl disable etcd
systemctl disable node
systemctl disable calico
systemctl disable salt-master
systemctl disable salt-minion
systemctl disable kube-apiserver
systemctl disable kube-controller-manager
systemctl disable kube-scheduler
systemctl disable kubelet

cd /etc/systemd/system/
systemctl disable rbd-*

cclear

systemctl stop docker
systemctl stop salt-master
systemctl stop salt-minion

yum remove -y gr-docker*
yum remove -y salt-*

rm -rf /etc/systemd/system/kube-*
rm -rf /etc/systemd/system/rbd-*
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

# /usr/local/bin/
可以根据需求删除：calicoctl  ctop  dc-compose  docker-compose  domain-cli  etcdctl  grcert  grctl  kubectl  kubelet  node  scope  yq
```
