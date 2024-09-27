---
title: application
description: Introduce concepts and design thinking for Rainbond applications
---

The application-level scope belongs to the lower-level resources of the team and is a logical application built by multiple components. Generally speaking, an application can be a business system, a business architecture, or a set of components with similar properties.

The application has the following characteristics：

- It defines the common life cycle of a group of components, which can start, stop, upgrade and other actions in batches.

- It defines the common deployment characteristics of a set of components, which can be converted into cloud native application templates (models) by publishing application instances.

- Under the scope of application, the overall externally provided services and categories can be defined.

- The communication topology and business topology between all components can be managed within the scope of the application.

- Business backup and migration can be performed as a whole within the scope of the application.

### How to make good use of "Apps"

The way we usually recommend is to divide the application into a relatively independent business system. For example, the enterprise ERP is an application, and the online shopping mall system is an application.In addition, for the same business system, there may be multiple stages, generally including development, testing, pre-release, and production.Therefore, different stages of the same business system should be multiple applications, which can exist in multiple teams combined with team division.In addition, for the same operational system, there may be multiple phases that typically include development, testing, pre-release and production.The different phases of the same business system should therefore be multiple applications, which can exist in multiple teams in combination with teams.

<img
src='https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/application.png'
title='Application segmentation use case'
/>
