---
title: 'Docking with Helm warehouse'
description: 'Dock Helm repository in Rainbond'
---

Follow this document to complete the docking of the Helm warehouse, so that developers or operation and maintenance personnel can deploy applications based on the Helm warehouse

### Preconditions

Before you start, you need to meet the following：

1. Have an enterprise administrator account;  
2. Have a Helm warehouse that can be used for docking.

### Operating procedures

Use **enterprise administrator account** in **enterprise view** click **application market**, click No. `+` to connect to the new application market, select Helm store, enter the following information, click Create to connect, if it is a private store, select Private Store Enter **store username** and **store password**.

Store Name：Custom  
Store Address：Helm Warehouse Address

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockinghelmstore.jpg" title="Docking helm warehouse" width="100%" />

After the docking is completed, the applications in the current Helm warehouse will be displayed automatically

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockingcomplete.jpg" title="Docking completed" width="100%" />

After completing the steps in this chapter, you can deploy the application in Rainbond based on the Helm application store. Please refer to document [to deploy the Helm application in Rainbond](./creation-process/)later.
