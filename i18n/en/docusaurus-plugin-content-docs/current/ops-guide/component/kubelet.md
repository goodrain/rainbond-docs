---
title: kubelet component description
description: "kubelet component parameter description"
hidden: true
---


### Operation mode

 Running through a binary, this component is an agent that runs on each cluster node and ensures that the containers in the Pod are running.


### Common parameter description

```
--config The Kubelet will load its initial configuration from this file.Paths can be absolute or relative; relative paths start from the Kubelet's current working directory.Omit this flag to use the built-in default configuration values.Command line flags override the configuration in this file.
--cni-bin-dir Full path to directory for CNI plugin binaries
--cni-conf-dir Full path to directory for CNI configuration files
--hostname-override If non-empty, this string will be used as an identifier, and Not the actual hostname
--kubeconfig Path to the kubeconfig file specifying how to connect to the API server
--network-plugin The name of the network plugin called by various events in the kubelet/pod lifecycle
--root-dir kubelet file directory path
--v=2 number of log level details
```

For specific parameters, please execute`kubelet -h`to obtain or refer to[Kubernetes official documentation](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)


