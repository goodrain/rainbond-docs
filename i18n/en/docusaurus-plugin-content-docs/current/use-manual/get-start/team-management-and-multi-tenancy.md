---
title: 1. Team management and multi-tenancy
description: Create multiple teams to isolate resources through multi-tenancy technology
---

### Purpose

Learn how to manage teams, roles, and users in Rainbond through documentation.What is multi-tenancy technology and what effect is achieved through multi-tenancy technology.什么是多租户技术，通过多租户技术实现什么效果。

### significance

- According to the existing personnel organization structure of the enterprise, creating different teams, creating users for enterprise employees and assigning appropriate permissions through roles is the first step in using Rainbond.

- Understand how Rainbond achieves resource isolation through **multi-tenant** technology.

### Preconditions

#### Private deployment user

For users who deploy Rainbond privatized on their own servers (physical machines, virtual machines, Alibaba Cloud ECS, etc.), the following conditions must be met：

- Installed Rainbond cluster.

- Completed enterprise administrator registration.

### Create a team

For the concept of team, please refer to [Team](/docs/use-manual/get-start/concept/team/)Users need to know how to make good use of the team.

The same team can open multiple data centers and manage the resources of the team in different data centers in a unified manner.

Try to create **dev team**,**test team**in default datacenter.

### create user

Register users of other personnel of the company through ordinary user registration, and assign users to each team created in the previous step according to the organizational structure of the enterprise, and assign appropriate roles.

A single user can play different roles in multiple teams, if the user does not belong to a certain team, then he will not be able to access all resources under that team, or even see this team in the team list.

### 多租户

Rainbond completes resource isolation through multi-tenant technology.Each team has a tenant in a designated data center.Applications between different teams are invisible to each other.每个团队在指定的数据中心，都有一个租户与之对应。不同团队之间的应用互不可见。

### Next step

Next, we will start to explore how to create the first application, the first service component in Rainbond.
