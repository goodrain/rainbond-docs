---
title: Automatic Certificate Issuance
description: Configure Cert-Manager to implement automatic HTTPS certificate issuance for applications
keywords:
- Cert-Manager
- Certificate Management
- Automatic Certificate Issuance
---

[Cert Manager](https://cert-manager.io/) is a certificate management tool for Kubernetes, based on the [ACME](https://tools.ietf.org/html/rfc8555) protocol and [Let's Encrypt](https://letsencrypt.org/) to issue free certificates and automatically renew them, enabling permanent free certificate usage.

This document will introduce how to use Cert Manager to implement automatic certificate issuance and integrate it with Rainbond.

## Prerequisites

- [Rainbond Quick Installation](../../quick-start/quick-install) has been completed

## Cert Manager Overview

### Work Mechanism Overview

After deploying Cert Manager to a Kubernetes cluster, you can create supported custom resources CRD to implement certificate issuance and automatic renewal functions. Here is an overview of Cert Manager's work mechanism:

![](https://cert-manager.io/images/high-level-overview.svg)

`Issuer` is a resource type used by Cert Manager to define certificate issuance methods. It supports the following certificate authorities:

- Let's Encrypt: A widely used free certificate authority that supports the ACME protocol.
- HashiCorp Vault: Suitable for enterprise-level key management and certificate issuance.
- Venafi: Supports more complex certificate management requirements in enterprise environments.
- Self-signed certificates: Suitable for internal usage scenarios.

`Certificate` is one of Cert Manager's core resources, used to define domain certificates that need to be issued and their related configurations. It contains the following key information:

- Domain information: Specific domains that need certificate binding.
- Configuration parameters: Additional information required for certificate issuance, such as validity period, key length, etc.
- Issuer reference: Association with a specific `Issuer` or `ClusterIssuer`.

`Secrets` are Kubernetes resource objects where issued certificates are ultimately stored for reference by other components.

### Certificate Issuance Overview

This document uses Let's Encrypt as the certificate authority. Let's Encrypt uses the ACME protocol to verify domain ownership, and upon successful verification, it can automatically issue free certificates. Free certificates are only valid for 90 days. By default, Cert Manager will automatically renew certificates 30 days before expiration, enabling permanent use of free certificates. There are two ways to verify domain ownership: `HTTP-01` and `DNS-01`.

**HTTP-01**: Verifies domain ownership by sending requests to the domain's HTTP service. It is suitable for services exposed through Ingress but does not support wildcard certificates. Cert Manager will dynamically create or modify Ingress rules, adding temporary paths to respond to Let's Encrypt's verification requests. After verification is passed, the certificate is issued.

**DNS-01**: Verifies domain ownership by adding TXT records at the DNS provider, supporting wildcard certificates without requiring Ingress. Cert Manager uses the DNS provider's API to automatically update records. Let's Encrypt queries the TXT records to complete verification and issue the certificate.

### Verification Method Comparison

| Feature             | HTTP-01                     | DNS-01                               |
| ------------------- | --------------------------- | ------------------------------------ |
| Ingress Dependency  | Yes                         | No                                   |
| Wildcard Support    | No                          | Yes                                  |
| Configuration Difficulty | Simple, suitable for all DNS providers | Complex, depends on DNS provider's API support |
| Typical Use Cases   | Only services exposed through Ingress | Services requiring wildcard certificates or without Ingress |

## Installing and Configuring Cert Manager

Install using [kubectl apply](https://cert-manager.io/docs/installation/kubectl/). Go to **Platform Management → Cluster Management → Command Line** and execute the following command to install Cert Manager.

```bash
kubectl apply -f https://get.rainbond.com/cert-manager/cert-manager-v1.17.0.yaml
```

After installing cert-manager, you can check the deployment status of cert-manager with the following command:
```bash
$ kubectl get pods -n cert-manager
NAME                                       READY   STATUS    RESTARTS   AGE
cert-manager-5c6866597-zw7kh               1/1     Running   0          2m
cert-manager-cainjector-577f6d9fd7-tr77l   1/1     Running   0          2m
cert-manager-webhook-787858fcdb-nlzsq      1/1     Running   0          2m
```

### Creating ClusterIssuer

[ClusterIssuer](https://cert-manager.io/docs/configuration/acme/http01/) is a core resource of Cert Manager, used to define certificate issuance methods and configurations.

Rainbond uses the **HTTP-01** verification method of `ClusterIssuer` by default to issue certificates. Execute the following command to create `ClusterIssuer`.

```bash
kubectl apply -f https://get.rainbond.com/cert-manager/ClusterIssuer.yaml
```

## Using Automatic Certificate Issuance in Rainbond

:::tip
Before enabling automatic certificate issuance, ensure that domain resolution has taken effect and is accessible via HTTP, otherwise certificate issuance will fail.
:::

1. After installing Cert Manager, an `Automatic Certificate Issuance` button will automatically appear on the right side of the domain name in Rainbond's gateway management. Enabling this button will automatically issue certificates.
2. The certificate issuance process can be viewed in `Gateway Management → Certificate Management → Automatic Issuance`.
3. After successful certificate issuance, there is no need to manually bind the certificate as it will be automatically matched and bound.

## Common Issues

### Certificate Issuance Failure

If certificate issuance fails, you can check the failure reason in `Gateway Management → Certificate Management → Automatic Issuance`. Common reasons include:
- Domain resolution has not taken effect. Please check if domain resolution is effective.
- Cluster network is abnormal and cannot communicate with Let's Encrypt servers. `https://acme-v02.api.letsencrypt.org/directory`
- Too many certificate issuance requests in a short time, resulting in rate limiting by Let's Encrypt servers.

If you are familiar with `kubectl` commands, you can also check certificate issuance status through `kubectl get certificate` in **Platform Management → Cluster Management → Command Line**.

### Certificate Renewal

After successful certificate issuance, Cert Manager will automatically renew certificates without manual intervention. By default, certificates are valid for 90 days, and Cert Manager will automatically renew them 30 days before expiration.
