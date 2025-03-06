---
title: Pipeline install
description: Pipeline App Plugin Installation
keywords:
  - Pipeline App Plugin Installation
  - Pipeline Plugin install
---

This paper describes the installation of the Pipeline application plugin, which includes the installation of the GitLab app and the GitLab Runner app.

## Deployment of GitLab and Runner

The Pipeline application plugin depends on GitLab and GitLab Runner, which need to be deployed first by GitLab and GitLab Runner.

If you already deploy GitLab and GitLab Runner, you can skip this step.

### Deployment of GitLab

Deploy GitLabs through Rainbond Open Source Store to \*\*Platform Manager -> Marketplace -> Open Source Store \*\* search `GitLab` to deploy the corresponding version.

### Deployment Runner

Deploys GitLab Runner via Rainbond Open Source Store to \*\*Platform Manager -> Marketplace -> Open Source Store \*\* search `GitLab Runner` to deploy the corresponding version.

- Once deployed, enter the **component -> Web Terminal** and execute the following command to register;

  - Modify the contents of<URL> <TOKEN> <TAG>\`s own GitLab addresses and tokens and Runner Tags.

```bash
gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "<URL>" \
  --registration-token "<TOKEN>" \
  --description "docker-runner" \
  --tag-list "<TAG>" \
  --run-untagged="true" \
  --locked="false" \
  --docker-volumes /var/run/docker.sock:/var/run/docker.sock \
  --docker-volumes /root/.m2/repository \
  --docker-privileged="true" \
  --access-level="not_protected" \
  --docker-pull-policy="if-not-present"
```

<details>
  <summary>Example configuration</summary>
  <div>

```bash
gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://80.gr6f750c.o67iknar.b5037d.grapps.cn" \
  --registration-token "yN7nsCp2U_Ry_S_NAUxs" \
  --description "docker-runner" \
  --tag-list "shanghai-runner" \
  --run-untagged="true" \
  --locked="false" \
  --docker-volumes /var/run/docker.sock:/var/run/docker.sock \
  --docker-volumes /root/.m2/repository \
  --docker-privileged="true" \
  --access-level="not_protected" \
  --docker-pull-policy="if-not-present"
```

  </div>
</details>

## Deployment Pipeline App Plugin

Deploy the Pipeline application plugin through Rainbond Open Source Store. Go to **Platform Manager -> Marketplace -> Open Source Store** to search for `Pipeline` and select the corresponding version to be deployed.

### Configure Pipeline App Plugin

Go to the **Pipeline app -> Pipeline-Backend component**, modify the following environment variables:

- **RAINBOND_URL:** Rainbond Console Visit Address, e.g.：`http://192.168.33.33:7070`.
- **RAINBOND_TOKEN:** Token from Rainbond console, available in **Top Right Users -> Personal Center -> Access Token**

Update or reboot the component takes effect after the modification has been completed.

:::caution
`BACKEND_URL` is the external access address of the backend service, the Webhook callback for external GitLab and the default domain name provided by Rainbond, which needs to be modified if you are using a custom domain name.
:::

Go to the **Pipeline app -> k8s resource -> Edit rainbond-pipeline**, modify the `access_urls` configuration in the `pipeline` resource to the external address of the `Pipeline-UI` component as follows:

```yaml
apiVersion: rainbond.io/v1alpa1
kind: RBDPlugin
metadata:
  labels:
    plugin. ainbon.io/name: pipeline
  name: pipeline
spec:
  access_urls:
  - https://custom. om
  alias: Pipeline
  author: Talkweb
  description: This app is based on GitLab CI/CD implementation, Development Rainbond existing architectural systems.
  icon: https://static. odrain.com/icon/pipeline.png
  version: 1.0.0
```

Once the modification has been completed, the `waterline` button can be seen in each team view.

:::caution
If the domain name of your Rainbond Console Access is HTTPS and the `rainbond-pipeline` Application plugin also need to go to HTTPS address and change the `access_urls` configuration in the `rainbond-pipeline` resource as described above.
:::