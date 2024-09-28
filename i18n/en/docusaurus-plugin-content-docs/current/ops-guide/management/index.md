---
title: Rainbond Component Transport
descrition: This section of the document is relevant to the knowledge of the Rainbod cluster dimensions and so on.
keywords:
  - Rainbond Component Transport
  - Rainbond vi
---

This chapter focuses on the common mode of delivery of components of the Rainbod system in order to help users to move faster and more efficiently.

## Component Info

For a description of each component, see [Rainbond组件概述](/docs/ops-guide/component/)

### View Component Details

Here you can see details for the `rbd-api` component

```bash
kubtl description pod -l name=rbd-api -n rbd-system
```

### Log View

#### ClusterIntegrationLog View

**For components running in pod, log is available as follows**

- View log in real time

```bash
kubtl logs -fl name=rbd-api -n rbd-system
```

Option Explanation:

-f, --follow continue output log\
-l, --label

- View last 20 lines of log

```bash
kubtl logs --tail=20-l name=rbd-api -n rbd-system
```

- View log for the last 1 hour

```bash
kubectl logs --sonce=1h -l name=rbd-api -n rbd-system
```

To view other component logs, simply replace the name of the component after the name with the component that wants to view the log sufficient

#### Console Log View

`/app/logs/goodrain.log`

```shell
# Alline's Deployed Console
docker exec -it rainbond-allinone bash
tail -f /app/logs/goodrain. og

# deployed to the cluster
# into rainbond-console web terminals, execute：
tail -f /app/logs/goodrain. og

# Helm deploy
kubectl exec -it rbd-app-ui-xx -n rbd-system bash
tail -f /app/logs/goodrain.log
```

## More Cover Guides

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
