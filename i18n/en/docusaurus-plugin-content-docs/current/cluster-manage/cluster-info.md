---
title: Edit cluster
description: Rainbond Edit Cluster Configuration
keywords:
  - Rainbond Edit Cluster Config
  - Rainbond Edit Cluster Configuration
---

Rainbond can modify cluster configurations including cluster names, API addresses, WebSocket communication addresses, HTTP default domain names, TCP default access domain names, cluster description, cluster certificates, etc.

## Edit cluster information

Go to \*\*Platform Manager -> Cluster \*\*,jump to the cluster management page, click **Edit** to access the cluster information editing page.

- **Cluster name:** Cluster name cannot be repeated.
- **API addresses:** cluster API address used to communicate with cluster
- **WebSocket address :** Cluster WebSocket address for communication between Rainbond console and cluster WebSocket, e.g.：log pushing, uploading files, etc.
- **HTTP default domain suffix :** cluster default HTTP domain name for Rainbond opening HTTP external access service auto-generate domain name suffix.
- **TCP default access IP:** cluster default TCP access IP for Rainbond opening of TCP auto-generated IP:PORTs from external access services.
- **Cluster Certificate:** Cluster Certificate Information used to communicate with cluster using the Rainbond Console and can be generated through the [grctl config](/docs/ops-guide/tools/grctl) command line tool.
