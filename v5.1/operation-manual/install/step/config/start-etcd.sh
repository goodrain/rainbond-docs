#!/bin/sh
LOCAL_NODE=manage01

INITIAL_CLUSTER_STATE=""

if [ -z $LOCAL_IP ];then
	echo "find ip address failed" > /dev/stderr
	echo "need define LOCAL_IP" >/dev/stderr
	exit 1
fi
# 如果是多个管理节点，请添加到此示例主机名:主机ip
NODES="
manage01:172.17.119.104
"
INITIAL_CLUSTER=""

LOCAL_NODE_COUNT=$(echo $NODES | tr " " "\n" | sort -u | grep $LOCAL_NODE | wc -l)
if [ $LOCAL_NODE_COUNT -ne 1 ];then
	echo "NODES contains $LOCAL_NODE_COUNT different nodes: $LOCAL_NODE" > /dev/stderr
	exit 1
fi

for node in $(echo $NODES | tr " " "\n" | sort -u)
do
	NAME=${node%%:*}
	IP=${node#*:}
	member="$NAME=http://$IP:2380"
	if [ -z $INITIAL_CLUSTER ];then
		INITIAL_CLUSTER=$member
	else
		INITIAL_CLUSTER="$INITIAL_CLUSTER,$member"
	fi
done

exec /usr/bin/docker \
  run \
  --privileged \
  --restart=always \
  --net=host \
  --name etcd \
  --volume=/opt/rainbond/data/etcd/:/data/etcd/ \
  rainbond/etcd:v3.2.13 \
  /usr/local/bin/etcd \
  --name $LOCAL_NODE \
  --data-dir /data/etcd/ \
  --listen-client-urls http://127.0.0.1:4001,http://127.0.0.1:2379,http://$LOCAL_IP:4001,http://$LOCAL_IP:2379 \
  --advertise-client-urls http://$LOCAL_IP:4001,http://$LOCAL_IP:2379 \
  --listen-peer-urls http://$LOCAL_IP:2380 \
  --initial-advertise-peer-urls http://$LOCAL_IP:2380 \
  --initial-cluster $INITIAL_CLUSTER \
  --initial-cluster-token cb9d7584-918a-474a-8eff-3d270ee4c0a7 \
  --initial-cluster-state ${INITIAL_CLUSTER_STATE:-new} \
  --auto-compaction-retention 1 \
  --quota-backend-bytes=$((4*1024*1024*1024))