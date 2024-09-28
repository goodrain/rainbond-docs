---
title: team
description: Introduce the concept and design thinking of the Rainbond team
---

The Rainbond team is a level of multi-tenant resource division under the enterprise. In the Rainbond multi-tenant system, resources are divided into the following levels：

- **Enterprise level** Rainbond open source version supports one enterprise level, which can include multiple clusters and multiple teams.Cloud and Enterprise editions support multiple enterprise tiers.Cloud versions and corporate versions support multiple enterprise levels.
- **Cluster level** The Rainbond cluster has a 1-to-1 relationship with the Kubernetes cluster, and multiple spaces are divided based on the Kubernetes Namespace.
- **team level** team can open space in multiple clusters, which is defined as the opening of cluster usage rights.The team is the most important resource division level of Rainbond. All applications and other resources are owned by the team. The granularity of resource management is carried out from the dimension of the team, and users will not form ownership of any resources.The concept of a team is very common in enterprise management, and generally refers to a community composed of people.In the Rainbond platform, we need to coordinate the permissions and logical management relationships of people, projects, and resources.Therefore, we directly refer to the concept of "team", and assign various resources to the team, including clusters, applications, components, plug-ins, etc., and people participate in each team to complete the management of various resources.In the same type of platform, the concept of the same type as the team may also have`environment`, `resource group`, `space`and so on.

### "Team" Design

Team concepts are common in enterprise management and generally refer to a community of people.In Rainbond platform, we need coordinator, project, authority and logical management of resources.We therefore directly cite the concept of “team”, in which all types of resources belong to the team, including clusters, applications, components, plugins and so on, and in which people participate in the process of managing the resources in each team.The same type of concept as the team in the same platform may also be `environment', `group of resources', `space`, etc.

### How to make good use of "team"

The division of teams under the enterprise has the following use cases for reference：

- By organization

> This is a relatively general method, which directly divides the team resource space and assigns personnel permissions according to the needs of different organizations within the enterprise.

- Divide by project

> This mode is suitable for delivery and production scenarios, especially 2B delivery. Each customer or project is allocated a team space, or multiple projects are independent of each other within the enterprise, and permissions are divided according to different project participants.

- Divide by environment

> This mode is tried in 2C software development and operation scenarios, such as dividing the development environment team, the test environment team, the demo environment team and the production team.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/team.png" title="团队划分参考用例" />

### Can the team manage multi-cluster resources

`can be` , a team can open multiple clusters, and the team's applications and components can be deployed to multiple clusters.However, the current version does not support the deployment of cross-cluster applications and components, and the deployment of the same component in multiple clusters, in a multi-location multi-active collaboration mode.Rainbond Cloud has plans to deploy cross-cluster components.However, the deployment of cross-cluster applications and components and the deployment of the same component in multiple clusters is not supported in the current version.Rainbond Cloud has programmed the deployment of cross-cluster components.
