---
title: Adjust Docker Container Log Collection
descrition: This section describes how to adjust the parameter collection logs of the Rainbond component after adjusting the default Docker data directory.
keywords:
  - Rainbond Adjust Docker Container Log Collection
  - Adjust Docker Container Log Collection
---

`rbd-node` is the component responsible for collecting the docker container log, which by default collects the log from the `/var/lib/docker/containers` directory. If you adjust the default data directory for the Docker, you will need to adjust the parameters of the `rbd-node` component.

## Edit rbd-node component parameters

Add the following content, where **path, mountPath** fill in the actual docker data directory

```bash title="kubectl edit rbdcomponent rbd-node -n rbd-system"
apiVersion: rainbond. o/v1alpha1
kind: RbdComponent
metadata:
  name: rbd-node
  namespace: rbd-system
spec:
  volumes:
  - hostPath:
      path: /var/lib/docker
      type: DirectoryOrCreate
    name: docker
  volumeMounts:
  - mountPath: /home/docker
    name: docker
```
