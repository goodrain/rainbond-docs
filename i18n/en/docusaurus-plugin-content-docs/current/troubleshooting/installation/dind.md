---
title: Stand-alone experience version
description: Single-machine experience version installation troubleshooting
keywords:
  - Single experience version, setup troubleshooter
  - allinone, installation troubleshooting
---

Rainbond, installed by quick installation script, belongs to the **Single Machine Experiment Version**. If there is a problem with installing the script, please check your current document for troubleshooting.

## Start process

![dind-process](https://static.goodrain.com/docs/5.12/troubleshooting/installation/dind-process.png)

**Rainbond single experience version** runs all services in a container, easy to use quickly and using dind (Docker in Docker), and all sorting operations take place in the `rainbond-allione` container.

During the entire installation process, the service will be started in the order below in：

1. Start Containerd service under **Supervisor** control.
   - Log path：`/app/logs/containerd.log`
2. Load container mirror pack.
3. Launch the K3s service controlled by **Supervisor**.
   - Log path：`/app/logs/k3s.log`
4. Launch Rainbodn Region.
   - Run on K3s as POD.
5. Launch Rainbond Console, launched by **Supervisor**.

## Exclude Ideas

The entire mapping process will also revolve around the implementation of these tasks.

Before starting the troubleshooting, start a new terminal, execute the following command, enter the `rainbond-allinone` container environment with：

```bash
docker exec -it rainbond-allinone bash
```

### Launch Containerd Stage

A **Containerd** service that runs in the background process will be launched in the `rainbond-allinone` container, through which a series of containers will be launched and managed.

If Containerd failed to start, you will see： in the `rainbond-allinone` launch log.

```bash
ERROR: Containerd failed to start. Please use the command to view the containerd log 'docker exec rainbond-allinone /bin/cat /app/logs/containerd.log'
```

View Containerd logs according to the command in the log:

```bash
tail -f /app/logs/containerd.log
```

Error sorting from Containerd log, combined [Containerd official document](https://containerd.io/).

### Load Mirror Stage

Use the [nerdctl](https://github.com/containerd/nerdctl) tool for `load` at the Load mirror stage.

If you have failed with a Load, this stage will be loaded.

#### Load Mirror FAQ

If the data is mounted locally using `-v local:/app/data` on **Win and Mac** you will fail because local storage does not match the Docker storage drive.

:::tip

You need to mount your store to docker Volume to solve problems.

:::

### Launch K3s Stage

A **K3s** service that runs in the background process will be launched in the `rainbond-allinone` container as a programming tool within the container.

If K3s failed to start, you will see： in the launch log `rainbond-allinone`

```bash
ERROR: K3s failed to start. Please use the command to view the k3s log 'docker exec rainbond-allinone/bin/cat /app/logs/k3s.log
```

View K3s log： from the command in the log

```bash
tail -f /app/logs/k3s.log
```

Error sorting from K3s log.

#### k3s FAQ list

```bash
Failed to create cgroup" err="cannoter cgroupv2 \"/sys/fs/cgroup/kubepods\" with domain controllers -- it is in an invalid state
```

:::info
Cgroupv2 is not supported in earlier versions of rainbond-allinone.Cgroupv2 was applied in Docker Desktop, version 4.2.0 and this caused conflict.So please downgrade Docker Deskop to version 4.2.0 and below.Or use the latest version of the single experience version of Rainbod.
:::

```bash
level=info msg="Set sysctl 'net/netfilter/nf_conntrack_max' to 196608
level=error msg="Failed to set sysctl: open /pro/sys/net/netfilter/nf_conntrack_max: permission denied
```

:::info
When encountering the above problems, the corresponding parameter can be modified to the same value in the log. In the linux operating system, the `syctl -w net/netfilter/nf_conntrack_max=196608`;
If the above action does not solve the problem or encounter it in the non-linux operating system, the environmental variable `-e K3S_ARGS="--kube-proxy-arg=conntrack-max-per-core=0`.
:::

```bash
/usr/lib/libbz2.so.1.0.8: no space left on device
```

:::info
Insufficient disk space on the host, increase disk space or delete unnecessary file releases; for Docker Desktop, [Disk utilization](https://docs.docker.com/desktop/mac/space/) learn to change disk space limits.
:::

### Launch Rainbond Region Stage

The `rainbond-allinone` container will launch **Rainbond Region POD** in the `rbd-system` namespace.Execute the following command in the terminal command line to get these POD information.

```bash
kubtl get pod -n rbd-system
```

By observing pod state the expected running state is n/n Running

```bash
NAME                                         READY   STATUS    RESTARTS   AGE
rbd-etcd-0                                   1/1     Running   0          2d22h
rainbond-operator-5f785ff5f6-2dvq6           1/1     Running   0          2d22h
rbd-gateway-4ss6z                            1/1     Running   0          2d22h
rbd-hub-64777d89d8-vvjn5                     1/1     Running   0          2d22h
rbd-node-bsmnj                               1/1     Running   0          2d22h
rbd-webcli-8c6849dc6-8lx98                   1/1     Running   0          2d22h
rbd-mq-5fcfb64d86-w8bjl                      1/1     Running   0          2d22h
rbd-monitor-0                                1/1     Running   0          2d22h
kubernetes-dashboard-fbd4fb949-5lf88         1/1     Running   0          2d22h
dashboard-metrics-scraper-7db45b8bb4-mqbpm   1/1     Running   0          2d22h
rbd-resource-proxy-8654b98bc9-4rvnq          1/1     Running   0          2d22h
rbd-db-0                                     2/2     Running   0          2d22h
rbd-chaos-xn6zr                              1/1     Running   0          2d22h
rbd-worker-8664fb5d9-zcfw4                   1/1     Running   0          2d22h
rbd-eventlog-0                               1/1     Running   0          2d22h
rbd-api-6f6c565856-bq9bp                     1/1     Running   0          2d22h
```

When some of the above pods are not in Running state, they need to be sorted according to their current status.Exceptional status may contain：

- Pending
- CrashLoopBackOff
- Evicted

:::info
Pending status means that the current pod is not able to enter the startup process properly, pod may be blocked by tasks that need to be performed before starting, so it is pending (Pending).To understand why a pod (in rbd-etcd-0 example), you can execute the command `kubectl descripbe rbd-etcd-0 -n rbd-system`, observe the last event partial output to determine the current pod event.and analyze in depth as prompted.
:::

:::info
CrashLoopBackOff state means that the current pod can already start normally, but its internal container exits itself, usually because of internal service problems.To understand why a pod (in rbd-etcd-0 example), `kubectl logs--f rbd-etcd-0 -n rbd-system` can be executed to see the output of the log, to determine the cause of the problem.
:::

:::info
The Evicted Status means that the current pod has been evicted from the movement control system, which may be triggered by the high disk occupancy rate in the root zone, the high disk occupancy rate in the data partition when the container is running.The status of the current node can be determined by executing the command `kubectl descripbe node`, observing the returned `Conditions` paragraph output.
:::

### Launch Rainbond Console phase

The Rainbond Console Service will be started in the `rainbond-allinone` container, which is launched by `Supervisord`.

If Console is not able to access it, please check the following log analysis issue：

```bash
/app/logs/console.log
/app/logs/console_error.log
```

## Modify path to mount storage

Rainbond dind single experience will store data in two directories, the container will have `/app/data` `/opt/rainbond` and the host will have two hosts in：

1. The default local data directory for Linux installation is `~/rainbonddata` \`/opt/rainbond.
2. Mac, Windows installed one-machine version exists in docker volume and can be viewed via `docker volume ls` command, `rainbond-data` `rainbond-opt`.

A single machine version based on Mac, Windows and Windows installation cannot be changed to a local directory. If the platform is not functional, please extend storage through Docker Desktop.

One-machine experience based on Linux installation can be modified by modifying volume fields in `install.sh` and by modifying the default local directory, as follows：

:::tip
If data already exists, it needs to be migrated to the new directory.
:::

```bash
$ vim install.sh

VOLUME_OPTS="-v ~/.ssh:/root/.ssh -v <local_path>:/app/data -v <local_path>:/opt/rainbond"
```

Delete the `rainbond-allinone` container, then re-run the `install.sh` script.

```bash
docker rm -f rainbond-allinone

bash ./install.sh
```
