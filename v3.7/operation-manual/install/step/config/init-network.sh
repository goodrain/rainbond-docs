#!/bin/bash

function check_calico_pool() {
    CALICO_NET_ETCD=$(echo '10.10.0.0/16' | sed 's#/#-#g')
    etcdctl get /calico/v1/ipam/v4/pool/$CALICO_NET_ETCD >/dev/null 2>&1
    if [ $? -eq 0 ];then
        return 0
    else
        return 1
    fi
}

function reconfig_calico_pool () {
    for path in $(etcdctl ls /calico/v1/ipam/v4/pool)
    do
        etcdctl rm $path
    done

cat - <<EOF | calicoctl create -f -
apiVersion: v1
kind: ipPool
metadata:
  cidr: '10.10.0.0/16'
spec:
  ipip:
    enabled: true
    mode: cross-subnet
  nat-outgoing: true
  disabled: false
EOF
}

case $1 in
    *)
    check_calico_pool || reconfig_calico_pool
    ;;
esac