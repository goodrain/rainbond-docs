---
title: 2 times the efficiency of product research and development, Penghai Software uses Rainbond to build an industrial Internet platform
description: Hello everyone, I am "Gao Yuan" from Qingdao Penghai Software Co., Ltd.Our team is mainly responsible for the underlying construction of the product platform, the update and specification of the architecture/technology, and we have developed a Manufacturing Execution System (MES) based on Rainbond...  
---

# 2 times the efficiency of product research and development, Penghai Software uses Rainbond to build an industrial Internet platform

:::info 
Hello everyone, I am **Gao Yuan**of Qingdao Penghai Software Co., Ltd.Our team is mainly responsible for the bottom-level construction of the product platform, the update and specification of the architecture/technology, and we have developed Manufacturing Execution System (MES), Warehouse Management System (WMS), Data Acquisition and Monitoring System (SCADA), Statistical Process Control based on Rainbond System (SPC), Laboratory Information Management System (LIMS), Enterprise Central Control Room (CCR), Energy Management System (EMS), Enterprise Asset Management System (EAM), Quality Management System (QMS), Intelligent Torque Interconnection System (ITM) ) and other products.

Next, I will share with you the experience of our team using Rainbond for rapid development. 
:::

## previous pain points

* Project Environmental Management

We often encounter that a team is responsible for multiple projects, and the development and testing environments of each project are under the responsibility of their respective project members, which will lead to inconsistencies in the environment and cause some problems.

And when building the environment, some shared middleware also needs to be rebuilt, wasting time to do repetitive work.

* Continuous deployment

We used to use Jenkins to do the process of packaging and building, but Jenkins has a set for each project, which cannot be unified, and requires a separate Pipeline in each environment, which is also repetitive work.

* Unified operation and maintenance

In the past, when we performed some operation and maintenance operations on the application, such as viewing logs, monitoring indicators, service status, etc., we manually performed the viewing on the server, or connected some tools, etc.

* high threshold

In fact, we do not have full-time operation and maintenance personnel. For Linux, Jenkins, and Tomcat, we all need our developers to spend time learning, which will delay development efficiency.



## Learn about Rainbond

Before learning about Rainbond, we tried to use containers to improve R&D efficiency. At first, we investigated several PaaS platforms and wanted to solve the above problems. We found that there are certain thresholds in the implementation process and it takes time to learn, but this is not the purpose of our containerization. , our purpose is to improve the efficiency of research and development.

I learned about the Rainbond product from the leader's mouth, and started the POC test. During the POC test, I found that it could completely solve our previous pain points.

**1. Team, Environmental Management**

   Rainbond's team management can clearly distinguish our projects. One project is a team, which is very convenient and intuitive to manage.At the same time, the team can be divided into multiple environments, such as development and test environments, which can be seen intuitively.

**2. Continuous Deployment/Continuous Integration**

   During the test, we found that Rainbond can directly connect to the source code repository, and then package, build, and run directly from the source code. The whole process does not require human intervention and saves a lot of time.

**3. Unified operation and maintenance**

   Each application or component can be operated in a point-by-point manner, such as viewing logs, scaling instances, and service status.

**4. Low barriers to entry**

   The Rainbond platform shields almost all k8s-related knowledge, and the business can be deployed without manually writing yaml.



## Use process

### 1. Docking code repository

Connect to Rainbond through GitLab OAuth2, you can build applications directly through GitLab and package them directly from the source code. This is very convenient, and the connection process is also very simple.



### 2. Deploy Microservices

The whole process of deploying microservices is also relatively easy. There is no need to write yaml. After docking the code repository, it can be packaged directly from the source code. At the same time, it can also be built with multiple modules. Most of our projects are multi-module.

After entering the multi-module building page, check the modules that need to be packaged, and then the number of components will be created and automatically built according to the number of modules.

![](https://static.goodrain.com/wechat/penghai/3.png)



### 3. Orchestration with Service Mesh

After the deployment is completed, the arrangement between services can be completed by connecting the topology diagram, shielding the relevant technical knowledge, and even Xiaobai can easily complete the microservice arrangement.

![](https://static.goodrain.com/wechat/penghai/1.png)



### 4. Environment Replication

For us in the past, the construction of the environment was a headache, and there are so many projects that require development and testing environments, and each project has basically 20-50 components, and we need to modify the configuration. Too much trouble.The previous construction was really time-consuming and labor-intensive, and there were too many repetitive tasks, which seriously affected our R&D efficiency.

In the process of using Rainbond, I found the function of fast copying, which is simply an artifact. When copying, you can also modify the build source address or mirror Tag, the dependencies between the components of the original environment after copying, the environment variables of components, configuration files, Storage, etc. will be copied over (without data).

Through the fast copy function, all our projects can quickly copy the test environment after building the development environment.

![](https://static.goodrain.com/wechat/penghai/2.png)



### 5. Configure WebHook

When creating a component based on the GitLab source code, there is a button to open the Webhook, or you can manually open the Webhook in the build source.

The configuration is simple and the use is simple. When we submit the code, Rainbond is automatically triggered to build without our human intervention.





## problems encountered

We have been using Rainbond for about a year. As we use it more and more deeply, we also encounter some situations that are not optimal, such as：

1. The configuration file is configured with environment variables
   
   In the past, the configuration of our Java project configuration file was hard-coded, such as Mysql, Redis connection address.After the best practices given by Haoyu technicians, we changed these configurations into environment variables. On Rainbond, after service A depends on service B, the environment variables of service B will be injected into service A, so we only It needs to be configured once, used everywhere, and is very flexible.

2. shared configuration file
   
   Some of our services do not have a configuration center, and there are often many identical configuration files, which used to be one for each.Now you can configure a component, other components share the configuration file of this component, one change, all components will take effect.





## Efficiency improvement

After using it for a period of time, I can feel that Rainbond has indeed brought us a significant improvement in R&D efficiency. Before, we always invested some manpower in the environment deployment. We did not have full-time operation and maintenance, and invested in R&D personnel. Need to learn these, in terms of time and cost, it saves a lot of time than before, allowing our developers to focus on code.Ease of use is also critical. Our front-end, back-end, and testers will deploy services on the Rainbond platform. In the previous development, the front-end students had to connect different modules to different back-ends, which almost disappeared, saving communication costs and other Additional waste due to uncertainty.





## Summarize

It is still in the continuous development stage, and the application market has not yet been used. It is planned that the delivery work after the development is completed will be delivered using the application market of Rainbond, or the application of our business modules can be realized through the application market. Come out, this piece will continue to try later.

Finally, I still look forward to the Enterprise Edition to update some new features.





## at last

The corporate services provided by Rainbond and Haoyu have also been recognized by the **Penghai**



> Good Rain's service response is relatively fast, and the delivery team is particularly enthusiastic.From the entire POC testing stage to the final large-scale use, timely response and quick repair can be guaranteed when encountering problems.What impressed me the most was that there was a problem with our R&D environment at that time, and the Haoyu delivery team helped us fix the problem overnight without delaying the R&D progress.
> 
> It has been nearly a year since Rainbond was officially launched on a large scale from the POC test, and the overall situation is very good.

