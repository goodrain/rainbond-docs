---
title: docker component description
description: "Docker component parameter description"
---


### Guardian operation mode

By default, the installation method of[easzup](https://github.com/easzlab/kubeasz) is used to deploy docker. For details, see[Install docker service](https://github.com/easzlab/kubeasz/blob/master/docs/setup/03-install_docker)

### Common parameter description

```json title="vim /etc/docker/daemon.json"
{
  "registry-mirrors": [
    "https://dockerhub.azk8s.cn",
    "https://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c .163.com"
  ],
  "max-concurrent-downloads": 10,
  "log-driver": "json-file",
  "log-level": "warn",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
    },
  "data-root": "/var/lib/docker"
}
```

For specific parameters, please refer to[docker official documentation](https://docs.docker.com/engine/reference/commandline/dockerd/)


### Configure docker to trust private image repositories

If your private image repository is not configured with https or self-signed https certificate, you need to configure docker trust.

* 1. If https or self-signed certificates are not configured (not trusted by browsers), you need to configure the docker`insecure-registries`value, and you need to restart docker when you are done

```bash
"insecure-registries": ["goodrain.me","hub.test.com"],
```

* 2. Self-signed certificates, and docker does not need to be restarted

You need to copy the certificate of the self-signed domain name to the following path `/etc/docker/certs.d/<Private image warehouse domain name>/`

Example goodrain.me

```bash
root@compute-node-99:/etc/docker/certs.d/goodrain.me# ls
server.crt
```


