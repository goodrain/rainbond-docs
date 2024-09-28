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

The way we usually recommend is to divide the application into a relatively independent business system. For example, the enterprise ERP is an application, and the online shopping mall system is an application.In addition, for the same business system, there may be multiple stages, generally including development, testing, pre-release, and production.Therefore, different stages of the same business system should be multiple applications, which can exist in multiple teams combined with team division.另外，对于同一个业务系统，其可能存在多个阶段，一般包括开发、测试、预发布、生产。因此同一个业务系统的不同阶段应该是多个应用，再结合团队划分其可以存在于多个团队中。

<img
src='https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/application.png'
title='Application segmentation use case'
/>
