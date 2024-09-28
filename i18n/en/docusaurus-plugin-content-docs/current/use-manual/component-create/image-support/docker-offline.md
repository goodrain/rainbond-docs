---
title: Docker Offline Create Component
description: To better respond to offline scenes
---

Users can create and configure Docker mirrors in a network connected environment and then upload them to the platform.In this way, even in environments where Internet connectivity is not available, these pre-positioned components images can be deployed and used.

## Preparatory work

Put the prepared mirrors into the Tar pack and download them with the following commands.

```bash
Docker Save xxx:latest > offline.tar
```

## Upload a Tar package to create a component.

### Entry

\*\* Entry 1: \*\*Team View -> New -> Build --> From Container --> Container Image -> Upload

\*\*Entry 2: \*\*Component View -> Add Component ---> Specify Image -> Upload

### Processes

1. Upload a packaged Tar package image, fill in the component name and click Create.Once this is confirmed, the platform resolves the Tar pack, stores all mirrors in the Tar pack to the mirror repository, and is visible in the local mirror.

2. Select one of the creation components from the parsed mirrors.

3. Successfully created and running.

## Local mirrors create components.

### Entry

\*\* Entry 1: \*\*Team View -> New -> Build --> From Container --> Container Image -> Container -> Local

\*\* Entry 2: \*\*Component View -> Add Component ---> Specify Image ---> Local

### Processes

1. The uploaded Tar packet parse mirrors will be stored in the local mirrors list and can be created quickly by selecting them.

2. Create a component.

3. Successfully created and running.
