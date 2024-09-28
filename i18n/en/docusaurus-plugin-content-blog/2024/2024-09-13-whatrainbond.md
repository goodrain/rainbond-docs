---
title: What is Rainbond?Complexity to break Kubernetes
description: In recent years, Kubernetes have become the standard for packaging with the rapid development of endogenous technologies.However, the complexity of Kubernetes has also become a major challenge for many developers and operators.Learning and managing Kubernetes may be a high learning cost for those teams that wish to focus on application development, especially in SMEs, who do not have sufficient resources and time to gain insight into all the details of Kubernetes.
slug: Whatrainbond
---

In recent years, Kubernetes have become the standard for packaging with the rapid development of endogenous technologies.However, the complexity of Kubernetes has also become a major challenge for many developers and operators.Learning and managing Kubernetes may be a high learning cost for those teams that wish to focus on application development, especially in SMEs, who do not have sufficient resources and time to gain insight into all the details of Kubernetes.

This is the time for **Rainbond**.As an open source of cloud native application management platform, Rainbond provides an abstraction that allows users to focus on the construction, deployment and management of the application without having to understand the bottom Kubernetes and packaging techniques.This “application-centred” concept has made Rainbond a very friendly platform for those who want to enjoy the cloudy technological advantage but do not want to fall into a complex operation at the bottom.

## Complexity：for developers in Kubernetes

In the modern cloud environment, Kubernetes are known as the **Gold Standards** for containers whose functions include automatic expansion, discovery of services, load equilibrium, scroll updates, etc.However, behind these powerful features, a steep learning curve is hidden.

Learning how to create and manage resources such as Pod, Service, Ingress, ConfigMap and PersistVolume for those developers who are not working on a full-time basis tend to divert attention from development.Not to mention complexity in multi-cluster settings, or how to ensure high availability, tolerance and extension under large-scale application scenarios.These issues require specialized knowledge and not the capacity of every team to deal with.

For example, the YAML configuration file in Kubernetes is at the heart of its application management and, while flexible, its syntax is complex and lengthy, and for developers who are not familiar with Kubernetes syntax, it is not only time-consuming and easy to write and debug them.The Kubernetes Core API contains approximately **50-60** objects (including different versions and extension objects, such as CRDs). The number of attributes varies from object to object, and each object usually owns **5-40**.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app-container
        image: nginx:latest
        ports:
        - containerPort: 80
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secret
        volumeMounts:
        - name: app-storage
          mountPath: /usr/share/nginx/html
      volumes:
      - name: app-storage
        persistentVolumeClaim:
          claimName: app-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: app-service
  namespace: default
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app-service
            port:
              number: 80
```

_The code above shows the complexity of the Kubernetes configuration file, which is a threshold for many developers._

## Rainbond：Simplified App Center Management

The design concept of Rainbond has been designed to address these issues from the outset.It hides the complexity of Kubernetes by **Applications abstract** and allows users to focus on what they are most interested — the application itself.

### 1. Application of the Abstract

The application abstraction is one of the core features of RainbondThe abstract of the application means that users no longer need to follow the underlying resources in Kubernetes (e.g. Pod, Service, Inprogress etc.), but rather to view the application from a higher perspective.In Rainbond, the app is seen as a whole, with users simply watching the app's status, dependence, and version, while complex operations such as bottom network configuration, storage management are handled automatically by the platform.

In this way, Rainbond significantly reduces the cost of learning for users, especially for developers or teams that do not have good knowledge of Kubernetes.

### Application centered

Rainbond emphasizes “application-centred”, which means that all functions and designs of the platform are built around the application.Whether it is the creation, deployment, extension or monitoring of the application, users see the overall performance of the application rather than the cluster or nodes details at the bottom.

Users can easily view and manage all apps' status, logs, dependencies, etc. through Rainbond's graphical interface, and all actions are straightforward.Rainbond provides a "one-click deployment" feature that allows developers to deploy applications directly from the repository and automatically generate containers and resource configurations, as well as to complete online application work.

![](https://static.goodrain.com/wechat/what-is-rainbond/1.png)

_The graph shows the application management interface of Rainbrond, which allows users to manage and monitor the app's state of operation through a visual interface._

## The application abstraction and application centered are technology trends

The development of cloud native applications is gradually moving towards an “application-centred” technological trend.In traditional infrastructure management, developers and transport operators need to focus on infrastructure and applications at the bottom, which not only leads to the separation of responsibilities, but also increases the cost of communication and collaboration.The abstraction integrates infrastructure management and application management, allowing developers and shipping teams to work together on the same platform to manage the life cycle of the application.

With the spread of microservices, DevOs and containerization technologies, applications are becoming more complex.By using abstraction, platforms can automatically handle the coordination of resources and services at the bottom, and developers can focus more on the business logic of the application, a trend that has become a consensus among the major cloud-origin platforms.

The application centred design not only reduces the mobility burden of developers but also increases the efficiency of their development and deployment.This trend is also evident in the Kubernetes community, such as the Open Application Model (OAM) project, which is built around the application level.Rainbond has been one of the leaders of this trend by further streamlining the complexity of Kubernetes.

## Summary

The emergence of Rainbond provides a shortcut to users who want to enjoy the cloud technological advantage but do not want to be able to cope with the complexity of Kubernetes.Through the abstraction and application-centred design, Rainbond not only lowered the threshold for Kubernetes but also provided a powerful capacity for both automated transport and low-code/no-code development.

In the future, as more businesses and development teams adopt cloud-origin technologies, Rainbond is a simplified operation and an efficient cloud application management platform that will certainly occupy a prominent place in the market.Rainbond drives the entire industry to move in a more efficient and intelligent direction by focusing developers on applications and turning the complex technological background into the past.
