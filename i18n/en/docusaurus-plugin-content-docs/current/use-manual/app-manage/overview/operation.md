---
title: Application life cycle
description: Describes the basics of the Rainbond application
---

## Supported basic actions

| Operation Type | Condition            | Note                                                     |
| -------------- | -------------------- | -------------------------------------------------------- |
| Boot           | Component Off        | Start the built-in component of the current app          |
| Stop           | All apps are running | Close all components of the current app                  |
| Build          | -                    | Build new versions and upgrade for all components in app |

Application base operation differs from component bulk operation according to：

| Contrast               | Component Bulk Operations          | Apply basic actions       |
| ---------------------- | ---------------------------------- | ------------------------- |
| Start control          | Batch unordered start              | Start in Dependency Order |
| Operation Target       | User-specified components          | Apply all components      |
| Supported Action Types | Close, reboot, start, move, delete | Build, start, stop,       |
