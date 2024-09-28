---
title: Rainbond Combining NeuVector Practice Container Security Management
description: NeuVector is the industry's first open-source container security platform
slug: newector
image: https://static.goodrain.com/wechat/neuvector/neuvector.png
---

:::info
This paper is mainly based on the steps taken by Rainbond to install a NeuVector Container Security Platform, as well as on best practices in the production environment with Rainbond
:::

<!--truncate-->

## Preface

Rainbond is a cloud native application management platform that is simple and does not require knowledge of containers, Kubernetes and substrate complex technologies, supports the management of multiple Kubernetes clusters and manages enterprises applying life cycles.But with little progress in the days of the births, the proliferation of security incidents in cyber containers has also given rise to further ideas about the safety and importance of the containers, and Rainbond has been particularly suited to the NeuVector in order to ensure that no similar container security incidents occur in the course of use by users.

NeuVector is the industry's first end-to-end open-source container security platform that provides a safe and secure enterprise level zero confidence for containerization loads.NeuVector can provide real-time and in-depth container network visualization, east-west container network surveillance, active isolation and protection, container host safety and internal container security, seamless integration of the container management platform and safe automation of the application level containers for various cloud settings, cross-clouds or local deployment container production environments.

This paper is mainly based on the steps taken by Rainbond to install a NeuVector Container Security Platform, as well as on best practices in the production environment with Rainbond

## Deploy NeuVector

NeuVector has a variety of deployment setups. In order to simplify installation, use helm to install it. Rainbond is also a form of support for helm shops. Just add a new store to the app market, and fill the helm store URL.

### Preparatory work

**Create team**

NeuVector is usually installed in the neuvector namespace while in Rainbond the team concept is naming space in kubernetes so that when installing through helm, the team needs first to create a corresponding team and the team's naming space in the cluster, fill in neuvector to select the cluster.

<img src="https://static.goodrain.com/wechat/neuvector/1.png" width="70%;" />

**Button helm store**

Rainbod supports direct deployment based on helm, so you will then use the neuvector official helm warehouse. Then you can use the Helm store to deploy neuvector, on the App Marketplace, click on Add Store, select helm store and enter the relevant information.

helm store address：https://neuvector.github.io/neuvector-helm/

![](https://static.goodrain.com/wechat/neuvector/2.png)

### Install

Click to install a neuvector team in helm repository

![](https://static.goodrain.com/wechat/neuvector/3.png)

Change the default key and value

![](https://static.goodrain.com/wechat/neuvector/4.png)

Values Configuration Item：

| Keys                                                                         | Value                                                            |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Registration                                                                 | docker.io                                        |
| tag                                                                          | 5.0.0- preview.1 |
| controller.image.repository                  | neuvector/controller.preview                     |
| enforceer.image.repository                   | neuvector/enforcer.preview                       |
| manager.image.repository                     | neuvector/manager.preview                        |
| cve.scanner.image.repository | neuvector/scanner.preview                        |
| cve.updater.image.repository | neuvector/updater.preview                        |
| manager.svc.type                             | ClusterIP                                                        |

Confirm pod status to Running after installation is completed

<img src="https://static.goodrain.com/wechat/neuvector/5.png" />

The neuvector provides a visualization interface, and the installation process will automatically create the Service, which can be exposed in the form of a third party component of the Rainbod platform.

<img src="https://static.goodrain.com/wechat/neuvector/6.png" />

The following options need to be configured

| Component name                | newector-web            |
| ----------------------------- | ----------------------- |
| Component English Name        | newector                |
| Component registration method | kubernetes              |
| Namespace                     | newector                |
| Service                       | newvector-service-webui |

Once added you need to add and open the external access port (8443), the default username and password are `admin/admin`

![](https://static.goodrain.com/wechat/neuvector/7.png)

Note that when：is visited, you need access via https, here neuvector is installed

<img src="https://static.goodrain.com/wechat/neuvector/8.png" />

## NeuVector Best Practices

### Network traffic surveillance governance

Network activity provided by NeuVector provides a clear view of network traffic movements between each pod.As well as the corresponding ports, rules, a clearer view trajectory.

The blue line represents the normal direction that is recorded in learning mode.

Yellow flows are recorded in surveillance mode and require us to manually review rules to decide whether or not to pass this traffic.

Red representation is a record of a negative movement in a protective mode and can also be avoided by rules.

![](https://static.goodrain.com/wechat/neuvector/9.png)

### Learning Mode, Monitor Mode, Protect Mode Usage

NeuVector groups support 3：learning mode, monitoring mode, and protection mode; each mode implements the following：

**Study mode**

Learn and record containers, interhost network connections and process execution information.

Automatically build a whitelist of network rules to protect the normal behavior of the app.

Set a secure baseline for processes running in each service container and create a whitelist of process configuration file rules.

**Monitor mode**

NeuVector monitors the network and process performance of the container and host. Behaviour recorded in non-learning mode will be warned in NeuVector security events.

**Protective Mode**

NeuVector monitors the network and process performance of containers and hosts, and directly rejects actions recorded in non-learning mode.

These three models allow for the identification of best practices that are appropriate to the production environment. When new operations are on offline, they can be tacitly modelled on the learning model, after a period of learning, documentation of containers and host rules, then converted into monitoring mode, running for a certain period of time, monitoring whether there is a special network traffic and the host process, helping us to record special network movements and warning to confirm whether or not to be released, and eventually converted into monitoring modes, so as to avoid unnecessary risks to our environment.

### ClusterIntegration-based Mirror Repositories make bug checks

The smallest unit of the kubernetes cluster deployment operation is a pod but the most important component of the pod is a mirror, and NeuVector is also able to perform a loophole check based on a mirror, avoiding the imaging being injected into a special loophole mechanism

In the case of Rainbond and without the use of external mirror warehouses, Rainbond will provide a default repository goodrain.me for storing images, which is a mirror for all operations built through Rainbond so it is clear from the mirrors inside the mirror that the business depends on which there are loopholes and that the impact of the image gap is avoided.

If an external mirror warehouse is used when the domain name can be parsed and the domain name can be parsed. Since goodrain.me itself cannot be parsed by NeuVector, it is necessary to manually add the corresponding parse to the cluster coredns to make sure NeuVector can connect.

Edit corns

```shell
kubtl edit cm coredns - n kube-system  
```

<img src="https://static.goodrain.com/wechat/neuvector/10.png" width="70%;" />

Gets a goodrain.me parsed IP

```shell
kubtl get rainbondcluster -n rbd-system -oyaml | egrep -v [A-Za-z{}]
```

Add the following to the specified location, note changing the IP

```shell
hosts LO
  192.168.0.1 goodrain.me
  fallthrough
}
```

Select Asset > Image Gallery on the left side of NeuVector web interface to add repository

![](https://static.goodrain.com/wechat/neuvector/11.png)

foodrain.me Default user is admin. Password fetched via the following commands

```shell
 kubectl get rainbondcluster -n rbd-system -yaml | grep password | sed "1d"
```

Once the image scan is finished, the image information will be rendered below. Click the name of the image you want to view will see the details below.

![](https://static.goodrain.com/wechat/neuvector/12.png)

## Write in the last

Through this paper, it is hoped that you will be able to deploy the NeuVector container security platform based on Rainbond and that it will be possible to do it in line with best practices, although the function of NeuVector goes far beyond that and will require constant exploration and practice.
