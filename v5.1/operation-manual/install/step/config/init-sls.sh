#!/bin/bash

MAIN_CONFIG="/srv/pillar/rainbond.sls"
YQBIN="/tmp/yq"
DEFAULT_LOCAL_IP="$(ip ad | grep 'inet ' | egrep ' 10.|172.|192.168' | awk '{print $2}' | cut -d '/' -f 1 | grep -v '172.30.42.1' | head -1)"
DEFAULT_PUBLIC_IP="$(ip ad | grep 'inet ' | egrep -v ' 10.|172.|192.168|127.' | awk '{print $2}' | cut -d '/' -f 1 | head -1)"

Write_Host(){
    ipaddr=$1
    name=${2:-null}
    if (grep $name /etc/hosts);then
        sed -i "/$name/d" /etc/hosts
    fi
    echo -e "$ipaddr\t$name" >> /etc/hosts
}

Write_Sls_File(){
    key=$1
    value=$2
    slsfile=${3:-$MAIN_CONFIG}
    isExist=$( $YQBIN r $slsfile $key )
    if [ "$isExist" == "null" ];then
        $YQBIN w -i $slsfile $key "$value"
    fi
}

Read_Sls_File(){
    key=$1
    slsfile=${2:-$MAIN_CONFIG}
    $YQBIN r $slsfile $key
}

init(){
  # configure ip address
  LOCAL_IP=$(cat ./LOCAL_IP 2> /dev/null)
  DEFAULT_LOCAL_IP=${LOCAL_IP:-$DEFAULT_LOCAL_IP}
  Write_Sls_File master-private-ip $DEFAULT_LOCAL_IP
  Write_Sls_File vip $DEFAULT_LOCAL_IP
  Write_Sls_File master-public-ip "${DEFAULT_PUBLIC_IP}"

  # configure hostname and hosts
  # reset /etc/hosts
  echo -e "127.0.0.1\tlocalhost" > /etc/hosts
  MASTER_HOSTNAME=$(Read_Sls_File master-hostname)
  hostname $MASTER_HOSTNAME
  echo $MASTER_HOSTNAME > /etc/hostname
  Write_Host "${DEFAULT_LOCAL_IP}" "${MASTER_HOSTNAME}"

  # Get current directory
  Write_Sls_File install-script-path "$PWD"

  # Get dns and write global dns info
  dns_value=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}' | head -1)
  Write_Sls_File dns.current "$dns_value"

  # generate secretkey
  secretkey=$(pwgen 32 1)
  Write_Sls_File secretkey "${secretkey:-auv2aequ1dahj9GameeGam9fei8Kohng}"

}


# -----------------------------------------------------------------------------
# init database configure

db_init() {

## Generate random user & password
DB_USER=write
DB_PASS=$(echo $((RANDOM)) | base64 | md5sum | cut -b 1-8)
DB_TYPE=$(Read_Sls_File database.type)

Write_Sls_File database.$DB_TYPE.host ${DEFAULT_LOCAL_IP}
Write_Sls_File database.$DB_TYPE.user ${DB_USER}
Write_Sls_File database.$DB_TYPE.pass ${DB_PASS}

}

# -----------------------------------------------------------------------------
# init etcd configure

etcd(){

Write_Sls_File etcd.server.bind.host ${DEFAULT_LOCAL_IP}
Write_Sls_File etcd.server.token $(uuidgen)
Write_Sls_File etcd.server.members[0].host ${DEFAULT_LOCAL_IP}
Write_Sls_File etcd.server.members[0].name ${MASTER_HOSTNAME}

Write_Sls_File etcd-endpoints "http://${DEFAULT_LOCAL_IP}:2379"

}

# -----------------------------------------------------------------------------
# init etcd configure
entrance(){
  Write_Sls_File lb-endpoints "http://${DEFAULT_LOCAL_IP}:10002"
}


# -----------------------------------------------------------------------------
# init network-calico configure
calico(){

    IP_INFO=$(ip ad | grep 'inet ' | egrep ' 10.|172.|192.168' | awk '{print $2}' | cut -d '/' -f 1 | grep -v '172.30.42.1')
    IP_ITEMS=($IP_INFO)
    INET_IP=${IP_ITEMS%%.*}
    if [[ $INET_IP == '172' ]];then
        CALICO_NET=10.0.0.0/16
    elif [[ $INET_IP == '10' ]];then
        CALICO_NET=172.16.0.0/16
    else
        CALICO_NET=172.16.0.0/16
    fi

  Write_Sls_File network.calico.bind ${DEFAULT_LOCAL_IP}
  Write_Sls_File network.calico.net ${CALICO_NET}

}

run(){
    init
    db_init
    etcd
    calico
    entrance
}

run

echo "Waiting to start salt."
for ((i=1;i<=60;i++ )); do
    echo -e -n "."
    sleep 1
    uuid=$(timeout 3 salt "*" grains.get uuid | grep '-' | awk '{print $1}')
    [ ! -z $uuid ] && (
      Write_Sls_File reg-uuid "$uuid" $MAIN_SLS
      Write_Host "$DEFAULT_LOCAL_IP" "$uuid"
    ) && break
done
