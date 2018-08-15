#!/bin/bash

imglist="rainbond/builder:v3.7 \
rainbond/rbd-app-ui:3.7 \
rainbond/rbd-eventlog:3.7 \
rainbond/rbd-worker:3.7 \
rainbond/rbd-webcli:3.7 \
rainbond/rbd-mq:3.7 \
rainbond/rbd-monitor:3.7 \
rainbond/rbd-entrance:3.7 \
rainbond/rbd-chaos:3.7 \
rainbond/rbd-api:3.7 \
rainbond/cni:rbd_v3.7 \
rainbond/builder:3.7 \
rainbond/plugins:tcm \
rainbond/rbd-lb:3.7 \
rainbond/cni:k8s_v3.7 \
rainbond/rbd-dns:3.7 \
rainbond/plugins:mesh \
rainbond/rbd-repo:3.7 \
"

do_pull(){
    echo "pull image:$1"
    docker pull $1
}

do_retag(){
    docker tag $1 $2
}

do_push(){
    echo "push $1 to local hub"
    docker push $1
}

for img in ${imglist[@]}
do
    do_pull ${img}
    if [[ "${img}" =~ 'tcm' ]];then
        do_retag ${img} goodrain.me/tcm
        do_push goodrain.me/tcm
    elif [[ "${img}" =~ 'mesh' ]];then
        do_retag ${img} goodrain.me/mesh_plugin
        do_push goodrain.me/mesh_plugin
    elif [[ "${img}" =~ 'builder' ]];then
        do_retag ${img} goodrain.me/builder
        do_push goodrain.me/builder
    else
        do_retag ${img} goodrain.me/${img#*/}
        do_push goodrain.me/${img#*/}
    fi
done