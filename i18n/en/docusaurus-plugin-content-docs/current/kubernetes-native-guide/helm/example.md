---
title: Deploy Wordpress and Mysql with Helm
description: An example of how to deploy Wordpress on Rainbond with Helm.
keywords:
  - Wordpress Helm
  - Rainbond Helm
---

This example describes how to install WordPress and MySQL on Rainbond with Helm installation commands.

These two components：

- Deploying resources for employment and statefulSet respectively, will be used to deploy workload.
- Save data using PersistentVolumes and PersistentVolumes
- Complete communication through the service.
- Encryption of environmental variables via Sercet.

## Tutorial Targets

- Drag Chart from the repository using Helm to deploy Workload class resources to Rainbond, including WordPress and MySQL.
- Manage non-Workload class resources in the `Apps > k8s resource`s in apps, including Service and Sercet.
- Manage Workload properties in `Other Settings > Kubernetes Properties` in the component, including labels, volume, volumeMounts and env from other sources.
- The `Environment Settings` section of the component manages the Workload properties that can be converted directly by Rainbond and includes the configuration of the custom environment variable.

## Ready to start

An available Helm installation command：

```bash
$ help install my-wp wordpress --repo https://charts.bitnami.com/bitnami
```

## Deploy Operations

1. Enter the team from the `workspace` to enter the command interface by clicking on the new \`> Kubernetes YAML Helm > Helm command.

2. Select an app or create a new app.

3. Enter the Helm installation command in the command box.

4. Waiting for Rainbond pull Chart and waiting for \`Packet check successfully'.

5. Click `Next` to configure and install.

6. Rainbond will show configuration options that have been parsed from the Chart pack with variations ranging from `input keys` to `edit values.yaml files`.Click `Install`：

7. wordpress and wordpress-mysql have been converted to components in Rainbond and started automatically after the build process has been completed.

<details>
  <summary>Recommended Actions</summary>
  <div>

- **Storage Transform**: For such resources as PVs, PVC as defined in Yaml, this will be reflected as `volumes` in `Other Settings > Kubernetes Attribute`, It is recommended that the general data persistence configuration `volumeMounts volumes` be defined as the storage of Rainbond components, delete the corresponding memory in `volumeMounts volumes` and add a path that needs to be perpetuated in `Storage > Storage Settings > Add Storage`.

- **Open External Service**: Rainbond provides a 4/7 layer of gateway, easily provides an external service entry for the component. Users only need to open `External Service` in the `Port` for the specified port to generate an accessible `Ip:Port` or domain name type.

</div>
</details>

## Verify

Visit the external service address of the wordpress component to go to the wordpress configuration page to start your installation trip.

## Manage components properties

See document [kubernetes属性](/docs/kubernetes-native-guide/import-manage/special-attribute) for how to configure various specifications currently supported by Rainbond

## Manage k8s resources in apps

See document [k8s资源操作](/docs/kubernetes-native-guide/import-manage/non-workload) for managing non-Workload type resources.
