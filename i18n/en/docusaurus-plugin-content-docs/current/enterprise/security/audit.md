---
title: Operating audit
description: Describe how audits are conducted and posted on the platform.
---

Operating audits are a key security function designed to record and monitor user operations and login activities occurring in the system.By reading this document, users will understand the definition and purpose of operating audits, recognize the importance and advantages of operating audits, and understand how to use the audit function for the key operations and logins of the system for monitoring, retroactive and protective purposes.

## Main features

By recording user actions and login activities on the corporate platform, the audit can provide the following benefits：

1. Trackability：operates an audit log to record user behavior and operations details, helping to trace and analyze the occurrence of specific operations and relevant participants.

2. Exceptional detection of：operations audits can be used to monitor potential unauthorized access, unusual activity, or security threats and take timely security measures.

3. Compliance requirement：is one of the measures necessary to meet compliance requirements for many industries to ensure data security and privacy.

At present, Rainbond supports recording users' operations and login logs, both of which are described in detail below.

### Operation Log

![description](https://static.goodrain.com/docs/enterprise-app/audit/operate_log.jpg)

Operation log functionality is intended to record user actions on Rainbond including, but not limited to, the same：

- User behavior：records the specific actions performed by the user, such as component creation, editing, deletion, gateway policy editing and changes to various platform configurations.

- Action details：show details of configuration changes before and after user action.Recover history quickly after an error has occurred.

- Operation time：records the date and time of the operation, exactly to seconds.

- Operation type：identifier, e.g. enterprise management, team management, application management, component management, local component library management, etc.

### Login Log

![description](https://static.goodrain.com/docs/enterprise-app/audit/login_log.jpg)

Login log is intended to record user login functions for tracking and recording user login activity on enterprise platform, including the following information：

- Log in at：to record the date and time of user login.

- Log in to IP ：to record the IP address used by the user.

- Login device：records the device or client information used by the user when logging in, such as operating systems, browsers, etc.

- Active duration：records how long the user actually uses in a given login.

## Manual

### Manage action logs

Platform operations audits are currently only visible to business managers and team administrators, where they can see all of the platform's operations logs and logs.The team administrator can see the action log under the team.

**Corporate Manager：**

1. Tap `Platform Manager` and select the left sidebar `log/audit`.

2. Click on the `Action Log` to see the user of the operation, the type of operation, the time, the content of the operation, and the details of the operation.

3. At this time, filters can be made based on date range, user, type of operation, etc. or directly on the content of the operation.For the operation of component type, the user can jump directly to the corresponding component or application.For operations such as configuration changes, they can be seen in the history version and the current version configuration directly in the operation details.

**Team Admin：**

1. Go to team view and click `management`.

2. In this `Dynamic` Tab page, you can see the action log and details of the app or component under this team.

### Manage login logs

1. Tap `Platform Manager` and select the left sidebar `log/audit`.

2. Click on the `Login Log` to see information about the user, client IP, login time, login device and active time.

3. At this point, filters can be made based on date range, user etc.

### Best practices

In using the audit feature of the operation, using the following suggestions to help you better use this feature to ensure the security and compliance of your operations.

- Featured Permissions Control：is important when using the Audit Function of the Operation.Depending on the user's roles and responsibilities, assigning appropriate permissions can effectively limit users' access and permissions to operate.The security of the platform is ensured through the separation of competencies and the periodic review and updating of competences.

- The periodic review of the action audit log：is a critical step in ensuring the safety and compliance of the operation.Regular review of logs allows for timely detection and detection of unusual operations or potential violations.When reviewing the audit log, attention needs to be paid to the type, time, executor and purpose and results of the operation.If any anomalies or irregularities are detected, appropriate measures must be taken immediately to investigate and respond.

- The periodic evaluation of the audit function：regularly evaluates the validity and integrity of the audit function of the operations is essential to ensure its continuity and effectiveness.Regular assessments make it possible to determine whether the operational audit function meets organizational needs and compliance requirements.The assessment includes checking the integrity, accuracy and traceability of log records to ensure that they are not tampered with or deleted.At the same time, there is a need to assess whether the operational audit function covers key operations and events and provides sufficient information for security audits and compliance certification.Based on the results of the assessment, adjustments are made and improvements are made to the operational audit function as necessary to ensure that it remains in a good state of operation.
