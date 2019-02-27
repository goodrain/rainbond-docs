rbd-version: 3.7
rbd-path: /opt/rainbond
install-type: online
master-hostname: manage01
master-private-ip: 10.10.10.46
master-public-ip: ""
vip: 10.10.10.46
domain: 171c2f.grapps.cn
install-script-path: /opt/rainbond/install
public-image-domain: rainbond
private-image-domain: goodrain.me
reg-uuid: 911de252-e964-4d8e-ae7c-2980837b7ee3
secretkey: EeXaenaiJei9ohteebaphu0cohhee9ni
docker:
  version: 1.12.6,fbecf51
  mirrors:
    enabled: true
    url: https://registry.docker-cn.com
dns:
  current: 100.100.2.138
  master: 114.114.114.114
  slave: 1.2.4.8
etcd-endpoints: http://10.10.10.45:2379,http://10.10.10.46:2379
lb-endpoints: http://10.10.10.45:10002-http://10.10.10.46:10002
rbd-pkgs:
  common:
  - gr-docker-engine
  - tar
  - ntpdate
  - wget
  - curl
  - tree
  - lsof
  - htop
  - nload
  - net-tools
  - telnet
  - rsync
  - git
  - dstat
  - salt-master
  - salt-minion
  - salt-ssh
  - iotop
  - lvm2
  - ntpdate
  - pwgen
  centos:
  - nfs-utils
  - portmap
  - perl
  - bind-utils
  - iproute
  - bash-completion
  - createrepo
  - centos-release-gluster
  - glusterfs-server
  debian:
  - nfs-kernel-server
  - nfs-common
  - dnsutils
  - python-pip
  - python-apt
  - apt-transport-https
  - uuid-runtime
  - iproute2
  - systemd
database:
  type: mysql
  mysql:
    image: rbd-db
    version: 3.6
    host: 10.10.10.46
    port: 3306
    user: write
    pass: 7971bba0
  cockroachdb:
    image: cockroach
    version: v2.0.2
    host: null
    port: 26257
    user: null
    pass: null
storage:
  type: nfs
  enabled: true
  server_args: /grdata *(rw,sync,no_root_squash,no_subtree_check)
  client_args: /grdata nfs rw 0 0
etcd:
  proxy:
    enabled: true
    image: etcd
    version: v3.2.13
  server:
    bind:
      host: 10.10.10.46
    enabled: true
    image: etcd
    members:
    - host: 10.10.10.46
      name: manage01
      port: 2379
    - host: 10.10.10.45
      name: manage02
      port: 2379
    token: e4bf1cf4-3084-4bbc-bc90-4225fed5aff8
    version: v3.2.13
kubernetes:
  cfssl:
    image: cfssl
    version: dev
  kubecfg:
    image: kubecfg
    version: dev
  cni:
    image: cni
    version: k8s_v3.7
  api:
    image: kube-apiserver
    version: v1.6.4
  manager:
    image: kube-controller-manager
    version: v1.6.4
  schedule:
    image: kube-scheduler
    version: v1.6.4
network:
  calico:
    image: calico-node
    version: v2.4.1
    enabled: true
    bind: 10.10.10.46
    net: 172.16.0.0/16
plugins:
  image: plugins
  tcm:
    image: plugins
    version: tcm
    tag: tcm
  mesh:
    image: plugins
    version: mesh
    tag: mesh
    metatag: mesh_plugin
proxy:
  runner:
    image: runner
    version: latest
  adapter:
    image: adapter
    version: 3.6
  pause:
    image: pause-amd64
    version: "3.0"
  builder:
    image: builder
    version: 3.7
rainbond-modules:
  rbd-api:
    image: rbd-api
    version: 3.7
  rbd-dns:
    image: rbd-dns
    version: 3.7
  rbd-registry:
    image: rbd-registry
    version: 2.3.1
  rbd-repo:
    image: rbd-repo
    version: 3.7
  rbd-worker:
    image: rbd-worker
    version: 3.7
  rbd-eventlog:
    image: rbd-eventlog
    version: 3.7
  rbd-entrance:
    image: rbd-entrance
    version: 3.7
  rbd-chaos:
    image: rbd-chaos
    version: 3.7
  rbd-lb:
    image: rbd-lb
    version: 3.7
  rbd-mq:
    image: rbd-mq
    version: 3.7
  rbd-webcli:
    image: rbd-webcli
    version: 3.7
  rbd-app-ui:
    image: rbd-app-ui
    version: 3.7
  rbd-monitor:
    image: rbd-monitor
    version: 3.7
  rbd-cni:
    image: cni
    version: rbd_v3.7
  k8s-cni:
    image: cni
    version: k8s_v3.7
  rbd-grafana:
    enabled: null
    image: grafana
    version: 5.2.2