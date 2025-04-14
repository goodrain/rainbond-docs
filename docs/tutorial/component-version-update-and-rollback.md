---
title: Component new version build and rollback
description: This tutorial details how to implement component version updates and rollback operations in Rainbond to ensure continuous and stable business operation
keywords:
  - Component version management
  - Version rollback operation
  - Gray release
  - Continuous deployment
---

This tutorial will demonstrate some of the core capabilities of Rainbond component management:

- **Multi-version management**: Retain historical build versions and support quick version switching
- **Rolling update**: Zero downtime for building new versions of components
- **Version rollback/update**: One-click rollback/upgrade to any historical version

## Preconditions

- Completed [Rainbond quick installation](/docs/quick-start/quick-install).

## Version rolling update

### 🚀 Highlights

- **Quick build**: Supports building new versions based on source code branches/tags, image versions, and application market versions.
- **Rolling update**: Zero downtime for updating component versions.

### 🧩 Operation process

1. **Deploy components using source code**
    ![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/source-en.png)
    1. Enter the target team view and create a new application.
    2. Select to build from source code ➡️ source code.
        - Customize the application name.
        - Repository address: `https://gitee.com/rainbond/docs-demo.git`.
        - Branch: `master`.
    3. Expected result: The application is built successfully, and the example page should display the default content.

2. **Update source code**
    - Fork and edit the source code on Gitee, modify the `index.html` file.

3. **Build new version**
    1. Click the **Build** button of the component, which will pull the source code again and build a new version.
    2. Expected result: The application is built successfully, and the example page should display your modified content.

## Version rollback/upgrade

### 🚀 Highlights

- **Version rollback**: Quick rebuild based on historical version images
- **Multi-version management**: Retain historical build versions and support version switching.

### 🧩 Operation process

1. **Select rollback version**
    ![](/docs/tutorial/component-version-update-and-rollback/rollback-en.png)
    - Enter Overview ➡️ View more versions ➡️ Historical version list

2. **Execute rollback**
    - Click the rollback button ➡️ Confirm the rollback operation.
    - Observe the component status returning to green healthy status.

3. **Verify rollback**
    - Access the example page, which should display the old version content.
    > Rollback operation will not roll back data changes.

4. **Select upgrade version**
    - Enter Overview ➡️ View more versions ➡️ Historical version list.
    - Click the upgrade button.

5. **Verify upgrade**
    - Access the example page, which should display the new version content.

:::info
Before updating the production environment version, it is recommended to verify the stability of the new version in the test environment first.
:::

## Reference