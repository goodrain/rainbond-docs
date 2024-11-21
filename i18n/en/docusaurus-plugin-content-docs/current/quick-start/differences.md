---
title: Differences from other technologies
description: This chapter describes key differences and commonalities between Rainbond and other products/technologies.
---

## Rainbond vs. Helm

### scene difference

Helm sets the package management tool on Kubernetes and is primarily a template for Kubernetes Yaml files.There is no reasonable control over the entire state of the application.Kubernetes is a technical component at the bottom of Rainbond. You do not need to learn containers and k8s to use Rainbond. Rainbond is compatible with the standards of containers and K8s. Rainbond runs on k8s, and k8s is responsible for the operation and scheduling of all applications.Allows the app to manage its life cycle (build, start, stop, delete, and state of application).

### Use differences

1. There is no clear status return mechanism after Helm installation of the app.User is not able to get a direct view of the entire application's deployment status and how the app is running.Rainbond visualizes the dependencies and state of operation of all components in the app in the form of a sketch.Also visualizable management applies to the lifecycle of individual components.

2. Helm app version management is a direct complete overlay without a reasonable grayscale strategy.Rainbond can be released by applying models and plugin capacity selectivelyQuickly rollback if necessary.In preparing Helm Application Templates, users need to learn more about Helm Chart writing.Rainbond implements the accumulation of application capabilities by publishing a single button on the interface.

## Rainbond vs. KubeSphere

### Positioning differences

KubeSphere is primarily located in the ability of the container to blend clouds for the cloud native app, the main typing and plugin-like ecological extension.cloud native Rainbond's idea of cloud native practice is similar to[Heroku](https://www.heroku.com/), but it has expanded its extension in the field of To B delivery. Other container platforms usually manage containers and infrastructure in a unified management interface, mainly for operation and maintenance. Difference with k8s Reference [Technical Architecture](/docs/quick-start/architecture/)Full life-cycle management and application delivery issues for 2B industries.

### Use differences

1. When KubeSphere deploys its business component based on a graphical interface, the fields that need to be filled are usually 'translation' of the yaml declaration configuration file. There are still some thresholds for users who are not familiar with Kubernetes for easy use.Rainbond does not use yaml files directly, all types of resources applied are defined in the developer's perspective, while Kubernetes is not required to deploy a business, and users are required to fill in the source address and focus on the business.Very friendly to users who are not familiar with Kubernetes.

2. Both introduce the concept of application templates, which are largely isolated from bottom techniques and concepts by packaging and abstract applications as a whole, including all operational definitions required for their operation.Finally implement the experience of deploying the app by one user key.Application templates in KubeSphere are based primarily on standard Helm application templates, better support for Helm templates, and developers can upload their own Helm Chart as an application template.Rainbond is based on the application template implemented by RAM (Rainbond Application Model).The developer can post the running app key directly to the app shop, see it, install the installed app in line with the original app.There is no need to learn about RAM actual implementation, nor do you need to learn Helm Chart writing.Make your own app template and make offline, cloud, private delivery, etc.

3. In the microservice architecture, KubeSphere has been packaged with Istio and has significantly reduced Istio's experience of use, but this does not mean that users can drop out of Istio at all and apply an internal topography based on prior configuration.Rainbond of self-researched micro-service frameworks are more user-friendly and a dragged microservice spelling mode is implemented.But there is a lack of standardization in the case of Istio and Linkerd these Service Mesh microservice frameworks.Rainbond also now offers an integrated approach that accepts Istio governance mode but has not yet been validated by a large number of users.

## Rainbond vs. Rancher

### Differences from container platforms

Rancher is a fully stack container management platform that can help to deploy and run clusters and manage the containers above.Rainbond has different management interfaces for different groups of people. It has an application management console for development, testing, and application operation and maintenance, a command-line tool and a resource management background for system operation and maintenance, and an application market for application delivery personnel and end users.The application delivery process (software development delivery process, enterprise IT management process, enterprise market ecology for applications) is also landscaped.The command line tool grctl is available for system performance.

### Use differences

1. Rancher has the greatest advantage of being fully compatible with the K8s system, focusing more on the integration of the k8s infrastructure, providing a more original application deployment method, while the set of cloud native fields that can be integrated at various levels is already very rich, while learning costs are high, offering one-stop solutions and being more friendly to the transport dimension.Rainbond offered greater ease of use to developers.Allows developers to quickly achieve cloud experience without learning about Kubernetes and related technologies and concepts.In addition, the integrated development environment, modular organization, application markets and other functions offered by Rainbond can significantly increase the efficiency of customization development and application delivery.Delivery can reduce delivery costs and difficulty by applying templates.

2. Rancher focused on helping the DevOps team face the challenges of operating peacekeeping in multi-cluster situations, where cluster deployments, cluster monitoring, container security, and so on.Rainbond does not provide the functionality to operate clusters and nodes directly.It is also based primarily on “app” multicloud management, which supports rapid deployment of applications in multiple clusters.So Rancher and Rainbond did not clash, connecting infrastructure downward, managing the safety and compliance of clusters was Ranch’s best nice, and increasing the experience of using cloud native platforms for final developers.
