---
title: A mixed cloud management solution based on Rainbond
description: The article explores the difficulties, key points in the mixed cloud scene, as well as solutions for the Rainbod platform in terms of mixed cloud management of the cross-cloud platform.Consistency management for applications in mixed clouds, including through the organization and management of containers in multiple clusters, has been achieved.
slug: hybrid-cloud
image: https://static.goodrain.com/wechat/hyper-cloud/hypercloud-1.png
---

The executive summary：explores the dilemma of the mixed cloud scenario, key points, and solutions for the Rainbod platform to blend cloud management across cloud platforms.Consistency management for applications in mixed clouds, including through the organization and management of containers in multiple clusters, has been achieved.The article also describes applications template delivery and cross-cloud team management for the Rainbod platform in a mixed cloud environment to help users simplify application delivery and delivery operations for the cross-cloud platform.

## Mixing Cloud App Scenes

As the endurance of cloud-origin technologies develops, blending clouds has become one of the most topical topics of business in the cloud-origin arena.A mixed cloud scenario is characterized by the deployment and operation of enterprise applications and data in multiple cloud settings, including private and publicly owned clouds, as well as different cloud service providers.Such a scenario presents many challenges and opportunities.

The value of blending clouds is primarily in：

- Flexibility and scalability：cloud blending allows companies to choose the most suitable deployment options in different cloud settings, making the deployment of applications and services more flexible and scalable.

- High availability and disaster resilience：clouds can reduce system shutdown time and data losses by deploying applications and data in multiple cloud environments.

- A blend of：cloud can reduce overall costs by allowing companies to select the most favourable prices and performance ratios in different cloud environments based on applications and data needs.

## Mixed cloud management elements

The mixed cloud scenes are much more complex than a single private or public cloud scenario, and difficulties in building them often arise from many differences between cloud platforms offered by different suppliers and make it difficult to achieve a unified management experience.Furthermore, there is no interoperability between cloud platforms provided by multiple vendors and there is a need to take into account consistency and security when data synchronization across clouds.

- The cross-cloud platform is standardized across：different cloud platforms, making operation and management complicated.Standardization can make the operation and management of different platforms more consistent and less difficult to manage.

- Data consistency needs to be ensured by data exchange and synchronization between：different cloud platforms in order to avoid data conflict and loss.

- Security：in a mixed cloud scenario, data and applications between different cloud platforms need to be properly protected to safeguard the confidentiality and integrity of data.

- User management：is not common between different cloud platforms in a mixed cloud scenario.The integrated hybrid cloud management platform has significantly reduced management costs by using a set of user systems to host computing resources in multiple clusters.

## Mixing Cloud Scene Feature Required

In a blend cloud scenario, the following cross-cloud features usually have strong：

1. Consistent operation experience：provides a consistent management experience to erase differences in user actions using different cloud resources.Allows users to complete the core process of applying from publishing to online to multiple cloud environments through a set of actions.Consistency experiences can greatly weaken users' feelings of discomfort with multiple cloud settings, making bottom computing resources transparent to users.

2. User management：completes a set of user management effects for all clusters by abstracting user systems at the uniform console level.Business management costs can be greatly reduced.

3. Cross-cloud migration and deployment of：becomes important as companies deploy applications on multiple cloud platforms.The ability to migrate applications from one cloud platform to another, deployed seamlessly and managed in a cloud environment, will greatly enhance enterprise flexibility and agility.

4. Multicloud tolerance：is important in a mixed cloud scenario because of the availability problems that cloud service providers may encounter.By deploying applications on multiple cloud platforms, enterprises can quickly switch to another cloud platform when there is a problem with one cloud platform, in order to maintain business continuity.

5. Cross-cloud data management：is also an important requirement in mixed cloud scenarios.The ability to backup and restore data on multiple cloud platforms, as well as to share data among different cloud platforms, will provide greater flexibility and scalability for enterprises.

## Mixed clouds building based on Rainbond

The Rainbod Native Application Management Platform considered how to adapt to mixed cloud management scenes at the outset of its design.In the design of the product, Rainbod can logically be divided into the console and cluster components in which the multicloud management module of the console can be interfaced and multiple clusters managed.In turn, cluster components can be deployed in various Kubernetes clusters to manage all types of resources in the Kubernetes cluster by communicating with Kube-apiserver.Rainbond cluster components can be deployed to various Kubernetes clusters, including standard Kubernetes clusters, K3s clusters, or to a hosting cluster such as the Aryun ACK hosting service, Tencent Cloud TKE service.It can be adapted to the many cloud services provided by the publicly owned cloud service provider, such as the distribution of Ariyun hard disk storage for operations Pod through CSI.

The Rainbod Console provides the only entry point for multi-cluster management that allows users to manage the operational steps for different cloud settings without having to learn too much.These operational steps are uniform and easy to use and are not constrained by different cloud environments at the lower levels.

<img src="https://static.goodrain.com/wechat/hyper-cloud/hypercloud-1.png" width="70%" />

### Team Workspace segregation

The Rainbrond native application management platform builds user systems at the control level, which means that the user system is not associated with the low cloud environment, and Rainbond determines the resources in the workspaces in which the user can access through its own RBAC.Rainbond divides users' workspaces through the abstract concept of a team.Correspondence between teams and low-level cloud environments can be shared or shared.Users can use the cluster set up by the team once they join the specified team.

- A shared mode：is a team that is open in multiple clusters and the team will create a namespace with the same name as the team is active in multiple clusters.Users in this team will naturally be able to deploy their own business systems in different clusters.The access points for different clusters are provided by the console and are very easy to understand.
- Unique mode：unique sharing mode is better understood, that the namespace matches it in the specified cluster, and users can only use computing resources in this cluster.

Based on the abstraction of the team's workspace, users can complete the publishing and management actions of the app.Rainbond provides additional capacity to enrich its management capacity, including through operating audits, resource limits, authority management, etc.

<img src="https://static.goodrain.com/wechat/hyper-cloud/hypercloud-2.png" width="70%" />

### Multi-cloud hazard

Blending cloud tolerance is a strategy in a mixed cloud scenario to ensure high availability and disaster resilience of applications.In a mixed cloud environment, since applications may be deployed on different cloud platforms, there is a need to ensure that an application can continue on other cloud platforms even if a cloud platform fails or is not available.This requires a mix of clouds that allows for seamless switching between different cloud platforms and ensures high availability and disaster resilience of applications.

The cloud management mechanism of Rainbond has created a solid low-level framework for cloud tolerance: even though Rainbond has invested heavily in his high capacity at his disposal, we can still not assume that there will be no collapse of the cluster hierarchy.Production environments often use other capabilities provided by cloud service providers to build robust cloud tolerance scenarios.Extra capabilities to quote include：

- Smart Web entrance switching capability：Rainbond relies on the collaboration of CDN and Smart DNS to complete intelligent switching of web entry.In normal times, external traffic can be automatically switched to access the nearest gateway on a geographical basis.When a cluster level delay occurs, the cluster entrance with a failure will be offline.
- Data sync capability：receives the same feedback regardless of service in a cluster to which user access. This effect is guaranteed by real-time synchronization of business data in multiple clusters.Rainbond does not provide data synchronization, a part of which we need to rely on data synchronization services provided by publicly available cloud suppliers.The DTS service provided by Aliyun is the representative.
- Data synchronization between：clusters is often not easily shuttled from public networks.From the point of view of security and reliability, we are more inclined to use dedicated networks for intercluster communications, especially in data cross-cloud synchronization.

It is our first priority to take into account multi-cloud tolerance in a holistic framework.But what we can do in the face of data disasters is not just prevention but recovery from disasters is also a very important one.The Rainbod cloud native management platform provides two levels of recovery capability, first, for the Rainbod platform itself, ensuring that the platform itself can be restored, and second, for the app's backup, enabling the entire backup of applications, including persistent data.Machine houses can be destroyed by war, fire, or natural disaster, but the entire Rainbod mixed cloud platform and its applications can be rebuilt as long as there is backup data in the hands of the operators.

<img src="https://static.goodrain.com/wechat/hyper-cloud/hypercloud-3.png" width="70%" />

### Intercloud app deployment

In mixed cloud scenarios, business applications are first-class citizens, and how they can be freely deployed in different cloud environments is actually the most basic requirement for mixed cloud management scenarios.In this regard, the Rainbod cloud native application management platform applies the template delivery process to apply cross-cloud deployment barriers.

Application delivery has been a painful problem that Rainbond has worked on.Modern microservices will easily split business systems into dozens of interrelated microservices that deploy them to Kubernetes cloud environments using traditional methods that are often painful for dozens of complex Yaml files and containers.Coupled with the diversity of cloud environments provided by different cloud providers, the experience of application delivery has been made even more disastrous.

As already mentioned, the Rainbond cloud native application management platform has wiped out the experiences of different cloud environments under the mixed cloud scenario.This is also true in the context of the application of the cross-cloud delivery scene, where complex microservice systems are abstract in Rainbond as an application that can be managed and delivered uniformly.You can complete one click installation and upgrade between different clusters by publishing the app into an application template.The cost of software delivery has been greatly reduced.

<img src="https://static.goodrain.com/wechat/hyper-cloud/hypercloud-4.png" width="70%" />

## Write in the last

Blending cloud management is the most popular topic in the current cloud computing arena, and most of the difficulties and pain can be solved by using the blend clouds created by Rainbond Cloud Management platform.Looking to the future, Rainbond will continue to flourish in the area of mixed cloud management around more complex scenarios with a wider range of cloud resources.For example, by integrating with Kubedge, the blend cloud solution is extended to the edge computing scenario.
