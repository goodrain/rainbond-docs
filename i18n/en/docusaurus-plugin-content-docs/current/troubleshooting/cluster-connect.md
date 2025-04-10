---
title: Cluster Troubleshooting
description: Introduction to Rainbond platform issues and troubleshooting approaches
keywords: 
- Rainbond platform troubleshooting
---

## 1. Cluster Communication Exception or Cluster End Unresponsive

Rainbond has a two-layer architecture: the console and the cluster end. The console communicates with the cluster end through APIs. If the communication between the console and cluster end is abnormal, the console will not function properly.

Possible causes of the exception include:

1. Network connectivity issues between the console and cluster end.
2. Unavailable API service on the cluster end.
3. API service on the cluster end being blocked by firewall.

### Troubleshooting Approach

If such issues occur, you can follow these troubleshooting steps.

#### Check Network Between Console and Cluster End

First, check the console logs by going to **Platform Management -> Logs -> Console Logs**. If you see `https://192.168.1.1:8443 time out`, it indicates network connectivity issues between the console and cluster end.

You can enter the console's terminal and use the `ping` command to check network connectivity between the console and cluster end.

If the network is not connected, check if the console and cluster end are on the same network segment. If they are not, you can configure routing tables to enable network communication.

#### Check Cluster End API Service

If the network between the console and cluster end is working and port `8443` is accessible, check if the API service on the cluster end is functioning properly.

Check the API service status with the following command:

```bash
kubectl get pod -l name=rbd-api -n rbd-system
```

If the API is not functioning properly, you can check the API service logs with:

```bash
kubectl logs -fl name=rbd-api -n rbd-system
```

Troubleshoot based on the error messages in the logs.

Or try restarting the API service:

```bash
kubectl delete pod -l name=rbd-api -n rbd-system
```

#### Check Ports Between Console and Cluster End

If the network between the console and cluster end is working and the API service is functioning properly, check if port `8443` is accessible between the console and cluster end. Use the `telnet` command to check port `8443` connectivity.

If it's not accessible, check if port `8443` on the cluster end is being blocked by the firewall. If it is blocked, you can configure firewall rules to enable port communication.

### Common Issues

#### remote error: tls: error decrypting message

When checking the rbd-api service logs, you may see the following error:

```bash
http: TLS handshake error from 10.42.0.1:35590: remote error: tls: error decrypting message
```

This error occurs because the certificates between the cluster end's API service and the console are inconsistent, preventing the console from communicating with the cluster end's API service.

```bash
$ kubectl get cm -n rbd-system region-config -o yaml
apiAddress: https://47.104.161.96:8443
ca.pem: |
  -----BEGIN CERTIFICATE-----
  xxxxx
  -----END CERTIFICATE-----
client.key.pem: |
  -----BEGIN RSA PRIVATE KEY-----
  xxxxx
  -----END RSA PRIVATE KEY-----
client.pem: |
  -----BEGIN CERTIFICATE-----
  xxxxxx
  -----END CERTIFICATE-----
```

Copy the printed content to the console's **Platform Management -> Cluster -> Edit**, and click **Save**.
* apiAddress corresponds to **API Address**
* ca.pem corresponds to **API-CA Certificate**
* client.pem corresponds to **API-Client Certificate**
* client.key.pem corresponds to **API-Client Certificate Key**

:::caution Note
There should be no spaces on either side of the certificates, otherwise the certificates will not be recognized.
:::

If you confirm that the console's certificates match the cluster end's certificates but the issue persists, you can try regenerating the cluster end's certificates.

```bash
# Delete cluster end certificates
kubectl delete secret rbd-api-client-cert rbd-api-server-cert -n rbd-system

# Restart operator to regenerate cluster end certificates
kubectl delete pod -l release=rainbond-operator -n rbd-system

# Restart api service
kubectl delete pod -l name=rbd-api -n rbd-system
```

After the operator restarts, it will regenerate the cluster end's certificates. You can then get the cluster information again using `kubectl get cm -n rbd-system region-config` and copy it to the cluster console.

## 2. Failed to Get Node List

This issue indicates that the Kubernetes cluster's node Labels do not match, preventing the console from getting the node list. By default, it distinguishes node roles using the `node-role.kubernetes.io/worker=true node-role.kubernetes.io/master=true` labels. Check if the node labels are correct:
  
```bash
kubectl get nodes --show-labels
```

If these labels do not exist, you can add them with the following command:

```bash
kubectl label nodes <node-name> node-role.kubernetes.io/worker=true
```

## 3. Platform Component Failure

Component failures appear on the platform management homepage, for example: the `rbd-chaos` component fails. This issue may occur for several reasons:

1. Monitoring data collection is not timely, leading to incorrect data and thus component failure.
2. The component is actually failing, which can be checked by viewing component logs.
```bash
# Check if component status is running
kubectl get pod -n rbd-system

# Check component logs
kubectl logs -fl name=rbd-chaos -n rbd-system
```
3. The component is working normally, but component failure alerts keep appearing. You can resolve this by restarting the component:
```bash
kubectl delete pod -l name=rbd-chaos -n rbd-system
```

## 4. Node in Eviction State Due to Disk Space Exceeding 80%

When the root partition disk space exceeds 80%, Kubernetes automatically enters eviction state, and all Pods will be evicted. At this point, Rainbond will not function properly, and you need to clean up disk space.

Clean up Docker unused resources:

```bash
docker system prune
```

Clean up Rainbond image repository stored images. If you are using the default Rainbond image repository, refer to [Clean up rbd-hub images](https://t.goodrain.com/d/21-rbd-hub).
