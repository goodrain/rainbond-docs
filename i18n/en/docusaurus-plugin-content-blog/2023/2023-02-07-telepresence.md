---
title: Make remote a gospel for local, microservice backend development
description: Telepresence is an open source tool for simulating microservices in the Kubernetes cluster in a local development environment that allows developers to run and debug microservices in a local development environment without fear of the complexity of the environment and difficult configuration
slug: teleport
image: https://static.goodrain.com/wechat/television/television.inline.png
---

One of the greatest pain points in microservice backends development is the difficulty of debugging that very affects our development effectiveness.

If we want to connect with other microservices, we need to start the corresponding microservice module in the local environment, which may take a lot of configuration and construction time, while also taking up much of our local resources and possibly \`immobile'.

While we can debug on the test server, the entire process is also lengthy. **Submit code -> Trigger CI/CD -> Wait for a successful building**. Possible simple BUG submissions with a code can solve the problem. Debugging on the server in this way is very difficult when you encounter complex BUGs, too time-wasted,\*\*Submit -> Wait for a long time \*\*, counter-repetition, and there is no easy local development tool to debug directly.

The tools described below integrate remote and local and allow local development to flourish.

## Television

Telepresence is an open source tool used to simulate microservices in Kubernetes clusters in a local development environment that allows developers to run and debug microservices in local development environments without fear of environmental complexity and configuration difficulties.

![](https://static.goodrain.com/wechat/telegram/television-archive.inline.png)

Simple Administrative Teleresence uses traffic agents from the Kubernetes cluster to the local. Telepresence has four services：

**Telepresence Daemon:** Local daemy processes for cluster communication and intercepting traffic.

**Telepresence Traffic Manager:** Installed traffic managers in clusters, proxy all related inbound and outbound traffic and track active interdiction.

**Telepresence Traffic Agent:** Intercept traffic sidecar containers, which are injected into the workload POD.

**Ambassador Cloud:** SaaS service, which is used together with Telefresh and mainly generates preview URLs and some value-added services.

### Global traffic blocking

Global traffic interception means intercepting all traffic of Orders to our local developers, as shown below.

![](https://static.goodrain.com/wechat/telepresence/global.png)

### Personal traffic blocking

**Personal traffic interceptions** allow selective interception of part of the service without disrupting the rest of the traffic.This allows us to share a cluster with others in the team without interfering with their work.Each developer can block orders only at their request and share the rest of the development environment.

Personal Interception requires the use of Ambassador Cloud\`. This is a fee-for-service that allows free users to block up to 3 services.

![](https://static.goodrain.com/wechat/teleprence/ind.png)

## Combining Telepresence Debugging Microservices on Rainbond

- Based on [host installation of Rainbond ](https://www.rainbond.com/docs/installation/installation/installation-with-ui/) or [Helm installs Rainbond](https://www.rainbond.com/docs/installation/installation-with-helm/).

### Install Telepresence

MacOS：

```bash
# Intel
brew install data/blackbird/telepresence

# M1
break install data/blackbird/telepresence-arm64
```

Windows：

```bash
# Opens Powershell

# Downloading compression
Invoke-WebRequest https://app.getambassor.io/download/tel2/windows/amd64/ latest/telepresence.zip -OutFile telepresence.zip

# Unzip
Expand-Archive -Path telepresence. ip -DestinationPatch telepresenceInstaller/telepresence
Remove-Item 'telepresence.zip'
cd televisionInstaller/telepresence

# Installing
Powerell.exe -ExecutionPolicy bypass -c ". '.\install-telepresence.ps1';"
```

### Install Teleresence data manager to cluster

Traffic Manager can be installed quickly with Teleprest and kubeconfig file `~/.kube/config` is required.

```bash
$ telepresence help install
...
Traffic Manager installed successfully
```

Or use [Helm to install Traffic Manager](https://www.getambassor.io/docs/telepresence/latest/install/helm) in a Kubernetes cluster.

### Local connection to remote service

Connect remote Kubernetes API Servers using `teleresence connect`, local needs to have `~/.kube/config`

```bash
$ telepresence connection
connected to context <your-context>
```

### Rapid deployment of Pig Microservice Apps on Rainbond

Rapid deployment of Pig Microservice Apps via Rainbond Open Source Store after deployment

![](https://static.goodrain.com/wechat/telepresence/rainbond-pig.png)

The next page uses the pig-auth service as an example to demonstrate the process of local development debugging which requires some minor changes to：

1. The default Workload is a string to install from the app store. You need to change the Workload as easy to view, for example pig-auth, enter the component name and change the component name to `auth`

2. The working theory of simple transactions is the proxy k8 service, the default gateway to auth is the nacos used for load balancing. The primary telepness cannot intercept traffic and we need to modify the gateway configuration to use k8s service for load balance.

   - Open 8848 external ports of pig-register components, visit nacos, modify `spring.cloud.gateway.routes.uri: http://gr795b69:3000` and `gr795b69:3000` via the port in the pig-auth component.

3. If only one pig-auth service is enabled, pig-auth needs to connect pig-register and redisis, then open the external ports of these services and modify the configuration file so that the local pig-auth service can connect remote to pig-register and redis.

### Debug auth service locally

Start pig-auth service locally using IDEA or VScode.

Locally using teleport blocking pig-auth traffic, command the following：

```bash
$ telepresence interception <workload> --port <local-port>:<service port name> -n <namespace>
```

Command Teardowns：

```bash
# <workload>
# services requiring traffic interdiction workload
$ kubectl get ploy-n zq
NAME READY UP-TO-DATE AVAILABLE AGE
pig-auth 1/1 1 146m

# <local-port> Local port

# <service port name>
# service name of service that requires traffic interdiction
$ kubtl get svc gr795b69 -n zq -o yaml
.
  ports:
  - name: http-3000
    port: 3000
    protocol: TCP
    targetPort: 3000
.

# <namespace> Namespace
```

Final command：

```bash
$ telepresence intercept pig-auth --port 3000: http-3000 -n zq
Using Deemployment pig-auth
intercepted
   Intercept name : pig-auth-zq
   State : ACTIVE
   Workload kind : Employment
   Designation: 127. .0.1:3000
   Service Port Identifier: http-3000
   Volume Mount Error : sshfs is not installed on your local machine
   Intercept: all TCP requests
```

We hit the breakpoint on the logout of logout, then sign out on the front end of the line to our local IDEA, with the overall effect of following：

![](https://static.goodrain.com/wechat/telepresence/teleepresence-debug.gif)

## Last

Telepresence helps us simplify local development processes while ensuring the correctness and reliability of the code.It also allows us to easily debug and test codes in clusters and improve development efficiency.Integration of Rainbond deployment is simple, from development to deployment, and let us focus on code writing.
