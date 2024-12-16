---
title: Monitor Alarm
description: Describe how to configure the alarm strategy.
keywords:
  - Monitor Alarm
  - alarm
---

The monitoring and alarm function of the Observability Centre, which focuses on real-time monitoring and early warning of services, enables timely detection of system and application components, services, etc. and avoids the expansion of failures and their impact on operations.

## Main features

Multiple data sources, such as Prometheus and Elasticsearch, can be connected to capture monitoring data.

Dashboard is a visualizable interface that displays data from various indicators and can be displayed on the interface by setting up icons and panels based on demand.

Alarm rules can be configured with Alerting features. Alarm rules can be created in a Dashboard panel and alarm conditions and trigger when alarm rules are created.You can set a number of ways to alert you by triggering emails, nails, slack notifications, Webhook etc.

After creating an alarm rule, test and optimization will be required to test the trigger of the alarm rule by manually modifying data, simulating anomalies, and optimizing and adjusting the rules

### Role

Data visualization：can visualize the monitoring data from various data sources and provide users with a clear picture of the status and changing trends of the monitoring indicators.

A variety of data sources support：support monitoring of multiple data sources, including time series data, log data, relational databases, etc. to meet the monitoring needs of different operations.

Flexible Alarm Settings：are flexible and can be set according to various conditions and rules, such as thresholds, time slots, data aggregation, etc. and can be handled differently according to different alert levels.

Integration with：allows you to integrate multiple alarm tools and services and to make it easier for users to choose how you want to make their own alerts.

Automated handling：alarms can automatically trigger some processing actions such as automatic restart of services, messenger notifications, etc. to reduce the burden of manual intervention and increase the efficiency of troubleshoot.

## Manual

### Set alarm rule

1. Set query and warning conditions, select data sources, add multiple query conditions and expressions, view results by preview or running.

2. Alert assessment behaviour, applicable to each rule within a group, can override the time interval between existing alarm rules.Configure alert status without data and mishandling.

3. Adds detailed information to warnings, writing summaries and tabs to help users manage alerts better.

4. Handles alerts by adding some custom tags that link alerts to contact points with matching tags and quiet alarms instances.

### Notification Sent

1. Select the alarm manager, add the template and save it in the message template. For more information about the template, see [模版文档](https://grafana.com/docs/gravana/latest/alerting/fundamentals/alert-rules/message-templating/)

2. Create a contact point to define where a notification will be sent and there are a variety of contact types, which mainly describe how to use email and nails to receive alarms messages.

   - Pick a nail, you need to configure a pegged custom robot to get the POST address as the requested URL. The configuration method is available at [钉钉自定义机器人使用](https://open.dingtalk.com/document/orgapp/custom-bot-creation-and-installation)

   - Please select an email address in the address options and enter multiple email addresses using the ";" separator.

   Test can be used to check if the alarm takes effect

### Notification Policy

1. Configure the base policy. All alerts will be transferred to the default contact unless additional matchers areas are set up in a particular route.

2. Configure specific routes to send specific alerts to selected contact points based on matching conditions.

3. Silence time is a specified time interval that can be referenced in the notification strategy tree in order to silence a specific notification strategy at a given time in a day.
