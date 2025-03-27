---
title: Environment Configuration Management
description: Manage application environment variables, configuration files, configuration groups, etc.
keywords:
  - Environment variables
  - Configuration files
  - Configuration groups
---

:::warning
Operations on the above environment variables will take effect after updating/restarting the component.
:::

## Environment variables

Rainbond provides component environment variable management functionality, allowing users to add, delete, modify environment variables, and transfer environment variables to dependent environment variables.

- Transferring environment variables to dependent environment variables will inject these environment variables into components that depend on this component when it is depended upon.

  > After transfer, the environment variables will still take effect in the current component.

## Configuration file management

Rainbond provides component configuration file management functionality, allowing users to add, delete, modify configuration files, and share configuration files from other components.

Enter the component's environment configuration page, click to add a configuration file, the content is as follows:

- Configuration name：custom
- Configuration file mount path: Must be an absolute path including the file name, for example: /data/test.conf
- Permissions: File permissions, such as: 777
- Configuration file content: Custom

Also supports dynamic rendering of environment variables.For example, Ningx configuration files do not support environment variable rendering by default, but Rainbond's configuration file mounting can achieve dynamic rendering of environment variables, as follows:

```nginx
server {
  listen  ${PORT:80};
  ...
  location /api {
    proxy_pass http://${API_HOST}:${API_PORT};
  }
}
```

### Share configuration files

Sharing configuration files involves mounting another component's configuration files to the current component, suitable for scenarios where multiple components share the same configuration files.

### Mount shared configuration files

Enter the component's environment configuration page, click to mount shared configuration files, the content is as follows:

- Fill in the local mount configuration file path, for example: /data/test.conf

## Configuration groups

Configuration groups are a set of environment variables that can take effect simultaneously across multiple components within the same application, very suitable for configuring unified environment variables for many components.

Enter the application view, click on configuration groups, add a configuration group.The last update component will take effect.

## Default environment variables

In addition to the environment variables set by the user, the platform will also inject default environment variables into the component's runtime environment.

| Variable name                                                                   | illustrate                                                                                                                                                           |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _PORT                                                      | Port number                                                                                                                                                          |
| _PROTOCOL                                                  | Port protocol type                                                                                                                                                   |
| _TENANT_ID                            | Tenant ID                                                                                                                                                            |
| _SERVICE_ID                           | Application ID                                                                                                                                                       |
| _SERVICE_NAME                         | Application name, composed of the application English name and component English name, formatted as: application English name-component English name |
| _NAMESPACE                                                 | Namespace                                                                                                                                                            |
| _MEMORY_SIZE                          | `micro、small` etc., the corresponding relationship is shown below                                                                                    |
| _SERVICE_POD_NUM | Instance count                                                                                                                                                       |
| _HOST_IP                              | Host machine IP address                                                                                                                                              |
| _POD_IP                               | Runtime IP address                                                                                                                                                   |
| _POD_NAME                             | Pod name                                                                                                                                                             |

Correspondence between memory size and `MEMORY_SIZE` environment variable value

> JVM configuration can be dynamically adjusted according to the MEMORY_SIZE variable, such as `JAVA_OPTS="-Xms${MEMORY_SIZE}m -Xmx${MEMORY_SIZE}m"`

| Memory/Mb | Environment variable value |
| --------- | -------------------------- |
| 128       | micro                      |
| 256       | small                      |
| 512       | medium                     |
| 1024      | large                      |
| 2048      | 2xlarge                    |
| 4096      | 4xlarge                    |
| 8192      | 8xlarge                    |
| 16384     | 16xlarge                   |
| 32768     | 32xlarge                   |
| 65536     | 64xlarge                   |