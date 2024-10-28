---
title: Component scaling
description: Horizontal Scaling and Vertical Scaling Documentation for Rainbond Components
---

Rainbond platform components can be scaled in two：

- Vertical scaling：increases or decreases the memory of the component (currently, the CPU and memory of the component are linked, adjust according to a certain ratio of`)
- Horizontal scaling：increases or decreases the number of instances of a component, suitable for stateless components and stateful horizontal cluster components

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/automatic-telescoping/service-scaling/Telescopic.png"/>


- During vertical scaling, the platform will automatically adjust resources and then restart the components. Single-node components will be interrupted, but multi-node components will not be affected.
- When scaling horizontally, the platform operates by scrolling new or offline nodes, so the operation will not affect existing components.


## Vertical scaling between CPU and memory ratio

<table spaces-before="0">
<thead>
<tr>
  <th>Application value ratio (CPU/memory)</th>
  <th>Limit value ratio (CPU/Memory)</th>
</tr>
</thead>
<tbody>
<tr>
  <td>0.24/1</td>
  <td>1.28/1</td>
</tr>
</tbody>
</table>

<p spaces-before="0">Kubernetes divides CPU and memory into application value and limit value. For details, please refer to: <a href="https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/">Manage computing resources of containers</a> 
The currently adjusted CPU and memory ratio of the platform has been verified in the production environment and conforms to most component types.If you customize the CPU allocation for some CPU-intensive components, you can configure the environment variable：ES_CPULIMIT : CPU limit value ES_CPUREQUEST：CPU request value</p>

<h2 spaces-before="0">Horizontal expansion</h2>

<h3 spaces-before="0">Conditions for the component to scale horizontally</h3>

<ul>
<li>stateless components</li>
</ul>

<p spaces-before="0">We generally call components that do not need to save their running state as stateless components, such as Web class components.Usually, as long as the cache system uses a third-party component such as Redis, the Web component can be considered as a stateless component and can be scaled horizontally.</p>

<p spaces-before="0">So someone has to ask, what if my web component needs to access files, Rainbond will handle the component's direct persistent storage synchronization.That is, the persistent storage used by each component instance is the same file system, which is the practice of separating computing and data.</p>

<ul>
<li>stateful components</li>
</ul>

<p spaces-before="0">The horizontal scaling conditions of stateful components will be more complicated. To support stateful scaling, the application must first support clustered horizontal scaling.</p>

<p spaces-before="0">For example, if we deploy a Mysql component, and we directly expand it to two instances horizontally, what will happen? Both instances work fine, but there is no relationship between them, that is, two Mysql components.Obviously this doesn't work.</p>

<p spaces-before="0">So what stateful components can scale horizontally, mainly in the following two categories：</p>

<ol start="1">
<li>Clustering components that can scale the cluster horizontally, such as Etcd, Zookeeper, Xiaoqiang Database, TiDB, etc.</li>
<li>For master-slave cluster components, we can generally scale the slave components horizontally.Such as Mysql, Redis, MongoDB, etc.</li>
</ol>

<h2 spaces-before="0">auto scaling</h2>

<p spaces-before="0">Component instance automatic horizontal scaling function reference document：<a href="./service-auto-scaling/">Automatic scaling</a></p>

<p spaces-before="0">How to make a stateful component cluster application will be explained in the theme document</p>

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>