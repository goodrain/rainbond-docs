---
title: Modular Personalized Delivery
description: The previous article introduced that standardized products are delivered to the customer environment through one-click installation, but for most 2B software delivery scenarios, different customer environments and needs will be different, and personalized needs are the norm, and these personalized needs have increased. 2B software delivery is difficult, so how to improve the efficiency of delivery of personalized requirements?
keywords:
- Modular Personalized Delivery
---

# Modular Personalized Delivery

:::info
The previous article introduced that standardized products are delivered to the customer environment through one-click installation, but for most 2B software delivery scenarios, different customer environments and needs will be different, and personalized needs are the norm. These Personalized requirements increase the difficulty of 2B software delivery, so how to improve the efficiency of personalized requirements delivery?
:::

<!--truncate-->


## The Difficulties of Personalized Delivery

![](https://static.goodrain.com/case/2022/04/06/16483950818734.jpg)

For enterprise product delivery, the higher the degree of personalization, the higher the delivery cost. The cost of delivery includes not only labor cost, but also time cost. Only by solving the efficiency problem of personalized delivery, the profit rate of products can be greatly improved. At the same time achieve large-scale delivery.

Personalized delivery mainly consists of the personalization of the delivery environment and the personalization of product：

### Delivery Challenges for Personalized Environments

- **infrastructure, difficult to **resources provided by different customers are diverse.In the privatization scenario, different customers have their own unique infrastructure, such as different hardware, some customers have self-built computer rooms, and some have purchased public cloud services such as Alibaba Cloud and Huawei Cloud.The operating systems are also different. For example, the common operating systems in enterprises are `CentOS/Redhat/Ubuntu/Debian/Kylin OS` and so on.For the CPU architecture, there are x86 servers and ARM servers.Different infrastructures and software need to be adapted, which increases the workload of the software delivery department.

- **Offline environment, delivery efficiency is extremely low** Considering security factors in some customer environments, it is not allowed to connect to the external network, which makes it extremely difficult to maintain the software in the post-delivery period.After-sales personnel cannot receive abnormal alarm information in time due to the network offline, users need to receive alarm feedback to the after-sales personnel, which may cause the problem location and repair process to be unsmooth due to technical differences.Due to offline, some expected changes or upgrades need to travel to the customer site, and the cost of support is relatively high.

- **Due to changes in the delivery environment, the test workload is large** Due to the personalized delivery environment, there is no guarantee that the functions can work normally, so after the deployment is completed, there will be a test verification process to ensure the delivery quality, and manual testing is required for automated tests that cannot be covered Manual regression to ensure the environmental quality of the delivery.The more complex the delivery product, the more complex the test verification will be.

### Delivery challenges faced by personalized functional requirements

- **Lack of module reuse, difficult to maintain in the later stage of customized development** For deliveries that require customized development, it is usually directly modified based on the existing code. This method seems to reuse the code, but requires full testing, and each customer has a branch , the more customers are delivered, the more chaotic the management will be. If the product has a new version, it will take a lot of effort to upgrade each customer, and the new functions developed when delivering to different customers cannot be quickly accumulated into the standard product.If the customer needs continuous iteration, delivering this version to the customer requires long-term maintenance.


- **It is impossible to establish a continuous delivery process from the development environment to the customer environment** In order to make the product meet the customer's personalized use effect, a continuous iterative process is usually required. Seeing the effect quickly poses a high challenge to the agility of delivery. If the customer's timeliness requirements cannot be met, on-site development is required, which will consume more manpower and material resources.



## Rainbond's solution

Rainbond is a cloud-native multi-cloud application management platform that provides full life cycle management of applications：application development, application orchestration, application delivery, application operation and maintenance; users use [source code to build](https://www.rainbond.com/docs/component-create/language-support/),[application replication](https://www.rainbond.com/docs/user-manual/component-dev/app_copy/),[application market ](https://www.rainbond.com/docs/enterprise-manager/enterprise/appcenter/)in the software development stage Function to build a development environment, quickly build an integrated development platform, the operation and maintenance of the business system includes management by the platform (elastic scaling, health monitoring, abnormal warning), users only need to focus on business code, other problems are solved on the platform, and development is effectively solved efficiency issues in the process.

Rainbond solves the challenge of personalized delivery from four aspects：

### 1. Deliver various customer environments through application templates


During the software delivery process, Rainbond abstracts the business system into**application templates**As long as the enterprise products can run normally in Rainbond, they can be released to the application market through the application templates. The application templates contain all the resources required for the service running state. In the form of publishing to the application market or exporting an offline installation package, it can be installed in any Rainbond cluster connected to the application market with one click to complete the application delivery.

![](https://static.goodrain.com/case/2022/04/06/16488321842140.jpg)


- **Shield customer environment differences, a set of product templates is delivered to all customers** Rainbond supports docking and management of various public clouds, private clouds, physical servers, and edge devices. The templates of enterprise products run on Rainbond, so delivery customers will use Rainbond together with The product template is delivered to the customer together. The product template is application-level packaging and abstraction. When the application is delivered based on the application template, the template contains all the resources required for the product to run, isolated from the underlying operating system, and only needs to focus on its own business, business In addition to technical problems：, resource management, operation and maintenance, architecture, governance, environment, etc., the Rainbond platform can solve the one-stop solution.

- **No need for separate adaptation, support localized CPU** Under the background that the country advocates localization and Xinchuang, the final customer's operating environment is also gradually using localized CPU. There are many types of localized CPUs, such as Feiteng, Kunpeng, Loongson, Shen Wei, etc., adaptation of these CPUs requires independent compilation and packaging, which requires a lot of work for all adaptations. Rainbond supports automatic compilation and packaging of localized CPU platforms.Localized CPU compilation and packaging reference article：[How to migrate x86 architecture applications to Arm architecture at low cost](https://mp.weixin.qq.com/s/1QjDk-q5Yn0md077WjdlaA)

- **Automatic delivery in offline environment** Delivery based on application template in offline environment, delivery personnel do not need to consider many offline resources, just import the application template into the installed Rainbond platform, and the delivery process can be completed with one-click installation, avoiding the traditional The mode needs to import a large number of offline resources, download update files, and ask for remote assistance when delivery problems are encountered.For offline delivery, please refer to the article： [Implementing Software Delivery in an Offline Environment with Rainbond](https://mp.weixin.qq.com/s/7_i-UbVBxcAEoGaxuuET3w).

- **Ensure environment consistency and avoid repeated testing** Deliver to customers through Rainbond's application template, which contains all elements of the enterprise product operating environment (package version, environment variables, operating system, configuration files, ports, dependencies, etc.) , which can ensure that the final software delivery and running environment is consistent with the development and testing environment, and reduce the need for repeated testing work due to different underlying environments.

### 2. Modularize product functions, deliver on demand and modularize assembly

For the modularization of Rainbond, please refer to the article： [Use Rainbond to package business modules to realize business building block assembly](https://mp.weixin.qq.com/s/liHYLDmBgcHuhOfODlwJvQ)

- **According to customer needs, select delivery by modules** ![一个完整企业产品的拓扑](https://static.goodrain.com/case/2022/04/06/16488357299292.jpg) A complete enterprise product will include many functions, and the functions selected by different customers will be different according to costs and scenarios. Through Rainbond, product functions can be modularized, similar to In the figure above, each hexagonal block is a module. All modules of the entire product can be delivered to the customer environment with one click through the application template, and then the unnecessary functional modules are deleted to complete the modular delivery.


- ****modular business assembly, and then customized development1 ![](https://static.goodrain.com/case/2022/04/06/16488789151193.jpg)

After accumulating reusable modular components, the delivery customer first builds the infrastructure based on the accumulated modular components, and then develops services that need to be customized. The newly developed services have reuse value, and can be used with one click Published to the app market to facilitate subsequent delivery.

### 3. Out-of-the-box development environment for functional customization
The development environment provided by Rainbond integrates functions such as code warehouse, Web IDE, product library, source code compilation, continuous construction, development and test environment management, release and rollback, and provides a variety of functions suitable for 2B customized delivery. For the development environment of Rainbond, please refer to the article： [Rainbond integrates GitLab](https://mp.weixin.qq.com/s/JtV2gvPLC22jbPTeLQJqyA), [Rainbond integrates Web IDE](https://mp.weixin.qq.com/s/issS7iz6r6WGlPpEqprvvA)

- **Quickly build a customized environment** To customize the delivery to customers, it is necessary to customize development based on standardized products, and to build a customized development environment, you need to create a new code branch, install database services, configure compilation and build processes, etc., and establish a test environment. There are more projects, and the later management will be more complicated.Rainbond can build a development and testing environment for a certain customer with one click through the[application copy](https://www.rainbond.com/docs/use-manual/user-manual/component-dev/app_copy/)function. Each customer environment can be configured with different developers and set corresponding permissions. After the delivery is completed, all the history of the customized delivery process is still retained. In any context, even if there is a change in personnel, others can quickly take over.

- **Integrated integration environment for complex projects** For more complex projects, it usually involves business integration and software integration of software vendors. The usual practice in the past was to complete their own functions first, and then integrate and jointly debug. However, due to business boundaries , development language, operating environment and other differences, the integration process will take a long time, and even overwhelm the previous work.In agile development, we advocate early integration. Rainbond provides an integrated integration environment, and prepares for integration during project development. Each manufacturer has its own environment in Rainbond. The interfaces of different manufacturers are integrated through Rainbond's micro-service architecture. The service architecture supports cross-language and cross-protocol service orchestration, and understands the overall project architecture and dependencies through topology diagrams.

- **Offline development environment at the customer site** Usually, Rainbond is used for development in the company's internal environment, and delivery is completed based on the application market or offline package. Subsequent product updates or bug fixes can complete continuous upgrades, but secret scenarios or user data In privacy scenarios, customers require to build an environment for development on their servers, and usually cannot access the Internet, that is, an offline development and testing environment is required. At this time, developers need to prepare a large number of offline resources, including IDE tools, maven/npm dependency packages, resulting in a development environment. It is very troublesome to build, but Rainbond can provide a complete set of offline development environment in the offline environment, which can be used immediately, including IDE tools and dependency packages, and solve the difficult problem of offline environment development.

### 4. Remote continuous delivery and operation and maintenance
Customer delivery is a continuous process. The custom development process requires continuous iteration, new version releases or bug fixes need to be upgraded to customers, and function delivery needs to ensure operational stability. Rainbond can be used to complete the above process in the company.

- **Remote continuous iteration and delivery** ![](https://static.goodrain.com/case/2022/04/06/16491739922257.jpg) Developed and tested products in the company through Rainbond and released to the application market, which manages all versions of the product, including various customized customer versions.According to whether the customer environment can access the Internet, two processes are supported:：
    1. The customer environment can be connected to the Internet, and the customer can connect to the application market through the assigned token, and install the specified version of the product and version with one click. If a new version is released, the customer environment can be automatically discovered, and the customer can upgrade by himself.
    2. The customer environment cannot be connected to the Internet. The offline software package is exported from the application market and sent to the customer. The customer can import it by himself, and install or upgrade it with one click.

- **Remote customer environment operation and maintenance** Rainbond provides the ability to automate application operation and maintenance, and can monitor and manage through the web interface. For the customer environment that can be connected to the Internet, all post-operation and maintenance can be completed remotely.Rainbond implements application management and operation and maintenance reference：[Cloud native application management and operation and maintenance](https://mp.weixin.qq.com/s/T6WwbQJKaVgwwWwLLkjH9g)

## Summarize

For the personalized delivery of 2B software companies, Rainbond automates the delivery process and writes as little code as possible, which can greatly reduce personnel investment. By applying the modular components accumulated in the market, it can also improve the response speed of enterprises to the market. With the gradual modularization of business, Rainbond has gradually become a PaaS platform for the whole process of 2B software enterprises, and it is a powerful tool to expand the market and improve the competitiveness of enterprises.

