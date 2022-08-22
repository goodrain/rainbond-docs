---
title: application life cycle
description: Describe the basic operations of Rainbond applications
---

## Supported base operations

| Operation type | condition                                             | illustrate                                                       |
| -------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| start up       | The component is closed under the current application | Start the built-in component of the current application          |
| stop           | All current applications are running                  | Close all components of the current application                  |
| Construct      | -                                                     | Build new versions and upgrades for all components under the app |

Application-level basic operations differ from component batch operations as follows：

| Contrast                  | Component batch operations             | Apply basic operations         |
| ------------------------- | -------------------------------------- | ------------------------------ |
| launch control            | Batch out-of-order start               | Start in order of dependencies |
| Operational target        | user-specified components              | All components under the app   |
| Supported operation types | Shutdown, Restart, Start, Move, Delete | build, start, stop,            |
