---
title: Deploy Helm app offline
description: Deploy Helm app offline in Rainbod
---

Users can download and configure Helm Chart packages while connected and then upload them to offline systems.Benefits include streamlining offline deployment processes, ensuring consistency and stability in application deployments, easy-to-apply version control and rollover, reducing resource consumption in offline environments and improving security.

### Preparatory work

Preparing a tgz pack for Helm Chart

### Entry

\*\* Entry 1: \*\*Team View -> New -> Yaml Helm k8s -> Helm -> Upload

\*\* Entry 2: \*\*Component View -> Add Component -> Helm -> Upload

### Operating processes

1. Upload a packaged Helm Chart tgz, click to create it.

2. Test passed, jump to values.yaml configuration view based on values.yaml information configured in Values configuration in the format of first level field.second.tertiary field.

3. When configured, jump to the resource display view. Here you can see all workload resources, while mirrors the right side of all components can configure the images used to change them.

4. Deploy and run successfully.
