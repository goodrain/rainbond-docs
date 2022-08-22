---
title: Deploy components using Statefulset
weight: 4002
---

For old kubernetes players, the resource type StatefulSet is not unfamiliar.For many stateful services, the StatefulSet resource type can be used to deploy.So the question is：Which is the best excavator technology?Um, no.



**How to use the StatefulSet resource type to deploy services in Rainbond?**



### Component deployment type



By changing the **component deployment type** in the other settings of the service component, you can choose to use the StatefulSet resource type to deploy the service. Before the operation, pay attention to the following points：

- The component needs to be in a closed state;
- For service components with persistent storage, switching the component deployment type will result in changes to the storage mount, so data backup must be done;

![deploy-statefulset-1](https://static.goodrain.com/docs/practice/deploy-statefulset-1.png)



：provides four component deployment types by default0

![deploy-statefulset-2](https://static.goodrain.com/docs/practice/deploy-statefulset-2.png)



- Stateful single instance：uses StatefulSet to deploy services, cannot perform horizontal scaling of instances, and the number of instances is always 1;
- Stateful multi-instance：uses StatefulSet to deploy services, and the number of instances can be scaled horizontally;
- Stateless single instance：uses Deployment to deploy services, and cannot perform horizontal scaling of instances, and the number of instances is always 1;
- Stateless multi-instance：uses Deployment to deploy services, and the number of instances can be scaled horizontally;



When you specify the component deployment type as StatefulSet in Rainbond, the service component will reflect the following characteristics：

- In the multi-instance state, all instances will be sequential, and the names of the instances will be similar to `gr6ec114-0` `gr6ec114-1` . closure.
- The above hostname will be resolvable in the cluster, under the same team, try to execute`nslookup gr6ec114-0`in any POD.Under different teams, you need to specify the namespace. The full address of the resolvable address is：`gr6ec114-0.gr6ec114.3be96e95700a480c9b37c6ef5daf3566.svc.cluster.local` , of which `3be96e95700a480c9b37c6ef5daf3566` is the namespace.
- In the multi-instance state, the persistent storage of each instance will be mounted separately, which means that persistent data is no longer shared between instances.
- In the single-instance state, when performing an update operation, the instance will start a new instance after it is completely shut down, which means that the service will be interrupted.
- In order to protect the consistency of persistent data, once the k8s node running the stateful service loses contact with the management node and is in the state of `notready` , the instance of its stateful service will not be automatically migrated.



On the whole, using `StatefulSet` resource type to deploy services will bring new features and at the same time, it will appear a little rigid, but the following discussion will find that these limitations are meaningful.



If you are careful, you will find that we bind the resource type `StatefulSet` to "stateful".Well, a new question arises：what is the "state" of the service.



### The "status" of the service



**Stateful Services = Stateless Applications + Stateful Data**

As can be seen from the name of the stateful service, it is related to the resource type StatefulSet.

Simply speaking, it can be difficult to understand what a stateful service is.Let me give some examples：



- The most common stateful service is the database middleware of the DB class.

For the common database Mysql, the same data can only be used by one Mysql program at the same time.After Mysql is started, it will generate a unique lock file in its own data directory and "lock" this file.In this way, other Mysql programs that want to use this data will interrupt the startup process because they find that the lock file is "locked".The advantage of this is to ensure strong data consistency, because the same data can only be read and written by the same Mysql application at the same time.

Please recall that one of the features brought by the `StatefulSet` resource type is that each instance will mount an independent persistent storage, which ensures that the Mysql service can be expanded into multiple instances to run, and will not be locked due to the lock file. Terminate the startup, but because the data is not shared with each other, there is essentially no relationship between the instances.Running Mysql with a stateful single instance seems to be the right choice.

Common database middleware with similar situation are Mongo, Postgresql, Redis, Etcd, etc.



- Another common stateful service scenario is sticky `Session`provided by Web-like services.

This sticky `Session` is kept in memory in some cases to provide session persistence and is itself a kind of data.Once this service is extended to multiple instances, once an incorrect instance is accessed, the login state will be lost because `Session` cannot be found.Using the IP Hash algorithm to distribute traffic in load balancing can solve this problem to some extent, and the traffic from the same IP will be distributed to the specified instance.However, we prefer that the distribution of traffic is round-robin, which ensures that the load of each instance is similar, and there is no situation where one instance is overloaded and other instances are idle.



Both of these stateful service scenarios point out to us that, for stateful services, the data of different instances are independent of each other.Data is "state".



In comparison, stateless services are much more flexible.They have no persistent data, or persistent data to support sharing.For the client, whichever instance is requested will get the same return.This feature means that the number of instances of stateless services can be expanded at will, and the traffic can be flexibly handled.



One of the biggest benefits of using cloud services is the elasticity and flexibility it provides. When the business encounters traffic peaks, instances can be quickly expanded to deal with it.From this perspective, we want services to be "stateless".So, a new question arises. Can we remove the "state" of the service and make it a stateless service：



### Handling the "state" of the service



Such Web services that use sticky sessions to maintain the login state, the state can be removed.

The principle is relatively simple, just separate the session from the web application and store it in other middleware, such as Mysql, Redis, Memcached and other database middleware.Common web frameworks on the market support this feature, and even make it the default option, because it's awesome!

The processed Web service becomes a stateless service, and the number of instances can be expanded arbitrarily.No matter which instance the request from the client is assigned to, its login status is retrieved from the back-end database, and the correct login status is returned.When deploying, you can choose stateless multi-instance deployment, that is, use the resource type of `Deployment`.



But for the database middleware of DB class, its state cannot be removed at will.

The reason is that this type of database middleware uses its own mechanism to ensure strong data consistency, such as Mysql's lock file mechanism, the specified instance can only read and write the corresponding data.For this type of stateful service, it is a must for each instance to have an exclusive copy of persistent data.And if you expand the number of instances：will, you will encounter many fatal problems, such as data inconsistency, or program failure, etc.Is this type of stateful service only a single point of deployment?

The manufacturers or communities of these database middleware are also very concerned about how to implement high availability solutions to solve the above problems.Even the database middleware launched in recent years will be designed as a distributed architecture in the design stage.For example, Etcd defines itself as a：-reliable and strongly consistent distributed key-value database.Internally, the Raft protocol is used to elect a unified leader among instances.For the relatively old database middleware such as Mysql, it also has a master-slave cluster solution based on Binlog replication.



Therefore, for this type of service that cannot remove the state, our idea and purpose is to follow the cluster solution supported by itself to achieve high availability and expansion of the number of instances.

When actually deploying these cluster solutions, it can be concluded that most cluster solutions need to meet the following conditions：

- Each instance mounts separate persistent data;
- Instances need to obtain each other's communication addresses to perform actions such as elections or data synchronization, such as resolvable host names or domain names.Be sure to use the hostname or domain name instead of the instance IP when getting the address, because as the instance restarts, the hostname or domain name will not change, but the IP may change, which is important;
- The number of instances is required. Generally, odd numbers such as 3, 5, 7, etc. are selected to ensure that the cluster will not have split-brain;

Recall the characteristics of the `StatefulSet` resource type, which satisfies all of the above conditions and is designed for stateful services.So this type of stateful service, its component deployment type should use stateful single/multiple instances anyway.




