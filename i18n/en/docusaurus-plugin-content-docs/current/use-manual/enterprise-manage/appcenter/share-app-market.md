---
title: Upgrading of App Market Applications
description: Application upgrade based on application market
---

### Application upgrade

For applications installed from the cloud market, if the user who shared the application has a minor version update to the application shared to the cloud market (the component version under the application has been updated), we will update your installed application on the console. Reminder, if you update the internal application market application, we will remind you to upgrade the application of the application you installed on the local console.

For the specific operation process, please refer to: [of application template](/docs/use-manual/get-start/upgrade-from-market)


### Judgment basis (implementation principle)

When users package and share a group of applications under their tenants, we will identify each component in the group, accumulate small versions of the applications, and store them in the public cloud market. When synchronizing to the internal application market, the data of the application and all the component information below it are stored in the internal application market, and the internal application market is judged by the small version and the small version of the application stored in the internal application market. Whether the application can be updated, the value of the minor version will be accumulated every time it is shared, and the minor version will be stored in the service construction source for update judgment when it is synchronized to the internal application market. The fields in the application data are used to judge the unique component to prevent the relationship from being disordered when storing dependencies; The application installed from the market is judged to update the basis by comparing the component version with the component version in the service construction source, so as to Determines whether the component is updatable.

The application update of the internal application market is to re-synchronize the public cloud market application to the internal market (that is, the data of the cloud market application is updated in the internal market). The application update of the local console is to update the application data of the internal market locally, and to The data center sends a request to pull the latest image for deployment.

### Version Definition
Application major version：A group of applications is packaged. During the sharing process, the user will manually enter a version number, which is the major version of the application that should be shared to the public cloud market. The change of the major version depends on the user's change. Share the app, changing the major version will not overwrite the historical version.

App minor version：of the app that should be shared to the public cloud market will generate a minor version and save it in the public cloud market. Every time the user re-shares the application, the minor version will accumulate the value to cover it.

Component version：For each component under a group of applications, when it is redeployed each time, a deployment version will be generated, which is the version of the component

