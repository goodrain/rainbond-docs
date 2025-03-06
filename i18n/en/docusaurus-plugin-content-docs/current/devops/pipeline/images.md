---
title: Mirror warehouse
description: Introduction to the Mirror Repository of Pipeline Application Plugin
keywords:
  - Introduction to the Mirror Repository of Pipeline Application Plugin
  - Intro GitLab Pipeline Plugin in image repository
---

The mirror repository shows the mirror products generated after the application service is built, which can be deployed directly to the Rainbow platform.

The Pipeline application plugin does not manage mirrors, only for versions of the mirrors to be deployed.

## Prerequisite

- Application service has been created.
- The pipeline is running successfully and has already pushed the image

## Action step

Go to the Rainbond Console and select the **streaming line** to the left menu bar. Go to the **mirror repository** page.

Select the app service to see mirror version information for the app.Select mirror version to be deployed directly to Rainbond application.

:::tip
A version of the mirror that has already been deployed. Redeployment will not display the selected app.Only if there is a mirror version deployed on Rainbond, the first deployment will prompt the choice of which app to deploy.
:::

