---
title: Application upgrade
description: Application upgrade
---

For apps installed from the app market, when the original app releases a new version, the platform will remind you to upgrade the app.

## Application upgrade principle

When users package and share a group of applications under their tenants, we will identify each component in the group, add up the small version of the application, and store the application data and all the components under the application data in the internal application market when synchronizing from the public cloud market to the internal application market. Determine whether the application in the internal application market can be updated by the small version and the small version of the application stored in the internal application market. When the small version is shared, its value will be added each time. When it is synchronized to the internal application market, the small version is stored in the service build source for update judgment. In addition, the fields in the returned application data are used to determine the unique components to prevent the relationship disorder when storing the dependency relationship. The application installed from the market determines whether the component is updatable by comparing the component version with the component version in the service build source.

Application update in the internal application market synchronizes applications in the public cloud market to the internal market (that is, the data of the cloud market application is updated in the internal market) Application update on the local console updates application data in the internal market, sends a request to the data center, and pulls the latest image for deployment.

## Apply Upgrade Attribute Change Rules

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
